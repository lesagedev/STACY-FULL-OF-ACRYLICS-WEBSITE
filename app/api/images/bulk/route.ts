import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, imageIds, categoryIds } = body;

    if (!imageIds?.length) {
      return NextResponse.json(
        { error: "Aucune image sélectionnée" },
        { status: 400 }
      );
    }

    switch (action) {
      case "delete": {
        await prisma.image.deleteMany({
          where: { id: { in: imageIds } },
        });
        return NextResponse.json({
          success: true,
          deleted: imageIds.length,
        });
      }

      case "addCategories": {
        if (!categoryIds?.length) {
          return NextResponse.json(
            { error: "Aucune catégorie sélectionnée" },
            { status: 400 }
          );
        }
        const data = imageIds.flatMap((imageId: string) =>
          categoryIds.map((categoryId: string) => ({
            imageId,
            categoryId,
          }))
        );
        await prisma.imageCategory.createMany({ data });
        return NextResponse.json({
          success: true,
          linked: imageIds.length * categoryIds.length,
        });
      }

      case "removeCategories": {
        if (!categoryIds?.length) {
          return NextResponse.json(
            { error: "Aucune catégorie sélectionnée" },
            { status: 400 }
          );
        }
        await prisma.imageCategory.deleteMany({
          where: {
            imageId: { in: imageIds },
            categoryId: { in: categoryIds },
          },
        });
        return NextResponse.json({ success: true });
      }

      default:
        return NextResponse.json(
          { error: "Action inconnue" },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error("Error in bulk operation:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
