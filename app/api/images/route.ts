import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "50");
    const search = searchParams.get("search") || "";
    const categoryId = searchParams.get("categoryId") || "";
    const projectId = searchParams.get("projectId") || "";

    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = {};

    if (search) {
      where.OR = [
        { alt: { contains: search } },
        { description: { contains: search } },
        { src: { contains: search } },
      ];
    }

    if (categoryId) {
      where.categories = {
        some: { categoryId },
      };
    }

    if (projectId) {
      where.projectImages = {
        some: { projectId },
      };
    }

    const [images, total] = await Promise.all([
      prisma.image.findMany({
        where,
        include: {
          categories: {
            include: { category: true },
          },
          projectImages: {
            include: { project: { select: { id: true, name: true } } },
          },
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.image.count({ where }),
    ]);

    return NextResponse.json({
      images,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching images:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { src, alt, description, categoryIds } = body;

    if (!src) {
      return NextResponse.json({ error: "src requis" }, { status: 400 });
    }

    const image = await prisma.image.create({
      data: {
        src,
        alt: alt || "",
        description: description || "",
        categories: categoryIds?.length
          ? {
              create: categoryIds.map((categoryId: string) => ({
                categoryId,
              })),
            }
          : undefined,
      },
      include: {
        categories: { include: { category: true } },
      },
    });

    return NextResponse.json(image, { status: 201 });
  } catch (error) {
    console.error("Error creating image:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
