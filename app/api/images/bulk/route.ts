import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hasLimitImagesColumn } from "@/lib/limit-images";

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

      case "addProjects": {
        if (!projectIds?.length) {
          return NextResponse.json(
            { error: "Aucun projet sélectionné" },
            { status: 400 }
          );
        }
        if (await hasLimitImagesColumn()) {
          const limitedProjects = await prisma.project.findMany({
            where: { id: { in: projectIds }, limitImages: true },
            include: { images: true },
          });
          const fullProject = limitedProjects.find((project) => {
            const incoming = imageIds.filter((imageId: string) => !project.images.some((image) => image.imageId === imageId));
            return project.images.length + incoming.length > 2;
          });
          if (fullProject) {
            return NextResponse.json({ error: "Un projet ne peut contenir que 2 images maximum" }, { status: 400 });
          }
        }
        const projectData = imageIds.flatMap((imageId: string) =>
          projectIds.map((projectId: string) => ({
            imageId,
            projectId,
          }))
        );
        if (projectData.length > 0) {
          await prisma.projectImage.createMany({ data: projectData });
        }
        return NextResponse.json({
          success: true,
          linked: imageIds.length * projectIds.length,
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
