import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, imageIds, categoryIds, projectIds } = body;

    if (!imageIds?.length) {
      return NextResponse.json(
        { error: "Aucune image sélectionnée" },
        { status: 400 }
      );
    }

    switch (action) {
      case "delete": {
        await prisma.image.updateMany({
          where: { id: { in: imageIds } },
          data: { deletedAt: new Date() },
        });
        return NextResponse.json({
          success: true,
          deleted: imageIds.length,
        });
      }

      case "restore": {
        await prisma.image.updateMany({
          where: { id: { in: imageIds } },
          data: { deletedAt: null },
        });
        return NextResponse.json({
          success: true,
          restored: imageIds.length,
        });
      }

      case "permanentDelete": {
        const images = await prisma.image.findMany({
          where: { id: { in: imageIds } },
          select: { id: true, src: true },
        });
        const blobUrls = images
          .map((img) => img.src)
          .filter((src) => /^https:\/\//.test(src));
        if (blobUrls.length > 0) {
          const { del } = await import("@vercel/blob");
          await del(blobUrls).catch(() => undefined);
        }
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
        const existing = await prisma.imageCategory.findMany({
          where: { imageId: { in: imageIds }, categoryId: { in: categoryIds } },
          select: { imageId: true, categoryId: true },
        });
        const existingSet = new Set(existing.map((e) => `${e.imageId}:${e.categoryId}`));
        const data = imageIds.flatMap((imageId: string) =>
          categoryIds
            .filter((categoryId: string) => !existingSet.has(`${imageId}:${categoryId}`))
            .map((categoryId: string) => ({
              imageId,
              categoryId,
            }))
        );
        if (data.length > 0) {
          await prisma.imageCategory.createMany({ data });
        }
        return NextResponse.json({
          success: true,
          linked: data.length,
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

      case "addProjects": {
        if (!projectIds?.length) {
          return NextResponse.json(
            { error: "Aucun projet sélectionné" },
            { status: 400 }
          );
        }
        const existing = await prisma.projectImage.findMany({
          where: { imageId: { in: imageIds }, projectId: { in: projectIds } },
          select: { imageId: true, projectId: true },
        });
        const existingSet = new Set(existing.map((e) => `${e.imageId}:${e.projectId}`));
        const projectData = imageIds.flatMap((imageId: string) =>
          projectIds
            .filter((projectId: string) => !existingSet.has(`${imageId}:${projectId}`))
            .map((projectId: string) => ({
              imageId,
              projectId,
            }))
        );
        if (projectData.length > 0) {
          await prisma.projectImage.createMany({ data: projectData });
        }
        return NextResponse.json({
          success: true,
          linked: projectData.length,
        });
      }

      case "removeProjects": {
        if (!projectIds?.length) {
          return NextResponse.json(
            { error: "Aucun projet sélectionné" },
            { status: 400 }
          );
        }
        await prisma.projectImage.deleteMany({
          where: {
            imageId: { in: imageIds },
            projectId: { in: projectIds },
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
