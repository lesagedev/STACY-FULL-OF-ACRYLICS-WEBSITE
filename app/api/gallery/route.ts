import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      where: { slug: { not: "archive" } },
      include: { _count: { select: { images: true } } },
      orderBy: { name: "asc" },
    });

    const images = await prisma.image.findMany({
      where: { categories: { none: { category: { slug: "archive" } } } },
      include: {
        categories: { include: { category: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ categories, images });
  } catch (error) {
    console.error("Error fetching gallery:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
