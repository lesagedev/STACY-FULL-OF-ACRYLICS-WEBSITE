import { del, put } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdminRequest } from "@/lib/admin-auth";

export const runtime = "nodejs";

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/avif"]);
const CONCURRENCY = 4;

function safeName(name: string) {
  return name.normalize("NFKD").replace(/[^a-zA-Z0-9.-]/g, "-").replace(/-+/g, "-").toLowerCase();
}

async function mapConcurrent<T, R>(items: T[], limit: number, fn: (item: T, index: number) => Promise<R>): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let cursor = 0;
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (cursor < items.length) {
      const index = cursor++;
      results[index] = await fn(items[index], index);
    }
  });
  await Promise.all(workers);
  return results;
}

export async function POST(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const formData = await request.formData();
  const files = formData.getAll("files").filter((value): value is File => value instanceof File);
  const alt = String(formData.get("alt") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const categoryIds = String(formData.get("categoryIds") || "").split(",").filter(Boolean);

  if (files.length === 0 || files.length > 20) {
    return NextResponse.json({ error: "Sélectionnez entre 1 et 20 images" }, { status: 400 });
  }

  const uploadedUrls: string[] = [];
  const createdIds: string[] = [];

  try {
    const categoryCount = categoryIds.length
      ? await prisma.category.count({ where: { id: { in: categoryIds } } })
      : 0;
    if (categoryCount !== categoryIds.length) {
      return NextResponse.json({ error: "Catégorie invalide" }, { status: 400 });
    }

    for (const file of files) {
      if (!ALLOWED_TYPES.has(file.type)) {
        return NextResponse.json({ error: `${file.name}: format non supporté` }, { status: 400 });
      }
      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json({ error: `${file.name}: taille maximale de 10 Mo` }, { status: 400 });
      }
    }

    const images = await mapConcurrent(files, CONCURRENCY, async (file) => {
      const blob = await put(`gallery/${crypto.randomUUID()}-${safeName(file.name)}`, file, {
        access: "public",
        addRandomSuffix: false,
        contentType: file.type,
      });
      uploadedUrls.push(blob.url);

      const image = await prisma.image.create({
        data: {
          src: blob.url,
          alt: alt || file.name.replace(/\.[^.]+$/, ""),
          description,
          categories: categoryIds.length
            ? { create: categoryIds.map((categoryId) => ({ categoryId })) }
            : undefined,
        },
        include: { categories: { include: { category: true } } },
      });
      createdIds.push(image.id);
      return image;
    });

    return NextResponse.json({ images }, { status: 201 });
  } catch (error) {
    if (createdIds.length) await prisma.image.deleteMany({ where: { id: { in: createdIds } } }).catch(() => undefined);
    if (uploadedUrls.length) await del(uploadedUrls).catch(() => undefined);
    console.error("Error uploading images:", error);
    return NextResponse.json({ error: "Upload impossible" }, { status: 500 });
  }
}
