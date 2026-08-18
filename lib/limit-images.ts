import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

let cachedColumnCheck: boolean | null = null;

export async function hasLimitImagesColumn(): Promise<boolean> {
  if (cachedColumnCheck !== null) return cachedColumnCheck;
  try {
    const rows = await prisma.$queryRaw<{ name: string }[]>`SELECT name FROM pragma_table_info('Project')`;
    cachedColumnCheck = rows.some((row) => row.name === "limitImages");
  } catch {
    cachedColumnCheck = false;
  }
  return cachedColumnCheck;
}

const projectFields = {
  id: true,
  name: true,
  description: true,
  createdAt: true,
  updatedAt: true,
} as const;

export async function getProjectSelect(includeImages = false): Promise<Prisma.ProjectSelect> {
  const select: Prisma.ProjectSelect = { ...projectFields };
  if (await hasLimitImagesColumn()) {
    select.limitImages = true;
  }
  if (includeImages) {
    select.images = {
      include: { image: true },
      orderBy: { order: "asc" as const },
    };
  }
  return select;
}

export const projectSummarySelect = {
  id: true,
  name: true,
} satisfies Prisma.ProjectSelect;
