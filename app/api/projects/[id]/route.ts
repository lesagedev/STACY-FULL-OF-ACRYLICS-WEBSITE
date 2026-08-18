import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getProjectSelect, hasLimitImagesColumn } from "@/lib/limit-images";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const project = await prisma.project.findUnique({
      where: { id },
      select: await getProjectSelect(true),
    });

    if (!project) {
      return NextResponse.json(
        { error: "Projet non trouvé" },
        { status: 404 }
      );
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error("Error fetching project:", error);
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
    const { name, description, imageIds } = body;

    const limitImagesEnabled = await hasLimitImagesColumn();
    const project = await prisma.project.findUnique({
      where: { id },
      select: await getProjectSelect(true),
    });
    if (!project) {
      return NextResponse.json(
        { error: "Projet non trouvé" },
        { status: 404 }
      );
    }

    if (imageIds && limitImagesEnabled && (project as { limitImages?: boolean }).limitImages && imageIds.length > 2) {
      return NextResponse.json({ error: "Ce nouveau projet ne peut contenir que 2 images maximum" }, { status: 400 });
    }

    if (imageIds) {
      await prisma.projectImage.deleteMany({ where: { projectId: id } });
      if (imageIds.length > 0) {
        await prisma.projectImage.createMany({
          data: imageIds.map((imageId: string, index: number) => ({
            projectId: id,
            imageId,
            order: index,
          })),
        });
      }
    }

    const updated = await prisma.project.update({
      where: { id },
      data: {
        ...(name !== undefined && { name }),
        ...(description !== undefined && { description }),
      },
      select: await getProjectSelect(true),
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.project.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
