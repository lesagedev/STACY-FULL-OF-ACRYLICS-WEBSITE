import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const image = await prisma.image.findUnique({
      where: { id },
      include: {
        categories: { include: { category: true } },
        projectImages: { include: { project: true } },
      },
    });

    if (!image) {
      return NextResponse.json({ error: "Image non trouvée" }, { status: 404 });
    }

    return NextResponse.json(image);
  } catch (error) {
    console.error("Error fetching image:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { alt, description, categoryIds } = body;

    const image = await prisma.image.findUnique({ where: { id } });
    if (!image) {
      return NextResponse.json({ error: "Image non trouvée" }, { status: 404 });
    }

    if (categoryIds) {
      await prisma.imageCategory.deleteMany({ where: { imageId: id } });
      if (categoryIds.length > 0) {
        await prisma.imageCategory.createMany({
          data: categoryIds.map((categoryId: string) => ({
            imageId: id,
            categoryId,
          })),
        });
      }
    }

    const updated = await prisma.image.update({
      where: { id },
      data: {
        ...(alt !== undefined && { alt }),
        ...(description !== undefined && { description }),
      },
      include: {
        categories: { include: { category: true } },
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating image:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.image.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting image:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
