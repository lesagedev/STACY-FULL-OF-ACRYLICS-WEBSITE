import { PrismaClient } from "@prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";

const adapter = new PrismaLibSql({
  url: process.env.DATABASE_URL || process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN,
});
const prisma = new PrismaClient({ adapter });

const CATEGORIES = [
  { name: "Gel", slug: "gel" },
  { name: "Acryl", slug: "acryl" },
  { name: "Nail Art", slug: "nail-art" },
];

const GALLERY_PHOTOS = [
  { src: "/gallery/creation-ongulaire-01.webp", alt: "Création ongulaire animal print", description: "Construction résine nude taille L forme carré + tigé orange + zèbre + strass", category: "Nail Art" },
  { src: "/gallery/creation-ongulaire-02.webp", alt: "Nail art animal print angle différent", description: "Construction résine nude taille L forme carré + tigé orange + zèbre + strass", category: "Nail Art" },
  { src: "/gallery/creation-ongulaire-03.webp", alt: "Nail art violet à pois", description: "Vernis gel violet avec pois blancs et studs dorés", category: "Gel" },
  { src: "/gallery/creation-ongulaire-04.webp", alt: "Création florale tropicale", description: "Construction résine nude taille L forme carré + zèbre + fleurs 3D orange", category: "Nail Art" },
  { src: "/gallery/creation-ongulaire-05.webp", alt: "Nail art floral angle différent", description: "Construction résine nude taille L forme carré + zèbre + fleurs 3D orange", category: "Nail Art" },
  { src: "/gallery/creation-ongulaire-06.webp", alt: "French bleu nuage", description: "Construction résine nude taille M forme carré + French bleu nuage + charme doré", category: "Acryl" },
  { src: "/gallery/creation-ongulaire-07.webp", alt: "Création artistique bourgogne", description: "Construction résine amande taille L + bourgogne + feuilles dorées + fleurs", category: "Nail Art" },
  { src: "/gallery/creation-ongulaire-08.webp", alt: "Nail art artistic detail", description: "Construction résine amande taille L + bourgogne + feuilles dorées + fleurs", category: "Nail Art" },
  { src: "/gallery/creation-ongulaire-09.webp", alt: "French élégante bourgogne", description: "Construction résine stiletto taille L + bourgogne + blanc + croco + studs", category: "Acryl" },
  { src: "/gallery/creation-ongulaire-10.webp", alt: "French élégante deux mains", description: "Construction résine stiletto taille L + bourgogne + blanc + croco + studs", category: "Acryl" },
  { src: "/gallery/creation-ongulaire-11.webp", alt: "Cat eye magnétique vert", description: "Construction résine amande taille M + nude + vert chat magnétique", category: "Gel" },
  { src: "/gallery/creation-ongulaire-12.webp", alt: "Cat eye magnétique detail", description: "Construction résine amande taille M + nude + vert chat magnétique", category: "Gel" },
  { src: "/gallery/creation-ongulaire-13.webp", alt: "Flammes vibrant", description: "Construction résine stiletto taille XL + flammes rose/orange/jaune sur nude", category: "Nail Art" },
  { src: "/gallery/creation-ongulaire-14.webp", alt: "Nail art rose avec nœud 3D", description: "Construction résine taille M forme carré + rose/blanc + nœud papillon 3D + cœur", category: "Nail Art" },
  { src: "/gallery/creation-ongulaire-15.webp", alt: "French lilas feuilles", description: "Construction résine taille L forme carré + French lilas + feuilles noires + paillettes", category: "Acryl" },
  { src: "/gallery/creation-ongulaire-16-popart.webp", alt: "Nail art pop art coloré", description: "Construction résine taille XL forme carré + nail art pop art coloré (fleurs, visages)", category: "Nail Art" },
  { src: "/gallery/vague03-2077.jpeg", alt: "Création ongulaire", description: "Pose ongulaire avec finition professionnelle", category: "Nail Art" },
  { src: "/gallery/vague03-3046.jpeg", alt: "Création ongulaire", description: "Construction et modelage d'ongles", category: "Gel" },
  { src: "/gallery/vague03-3047.jpeg", alt: "Création ongulaire détail", description: "Détail de pose ongulaire", category: "Gel" },
  { src: "/gallery/projet04-03.jpeg", alt: "Projet 4 rendu final", description: "Création artistique avec design sur mesure", category: "Nail Art" },
  { src: "/gallery/projet5-06.jpeg", alt: "Projet 5 rendu final", description: "Set complet avec nail art détaillé", category: "Nail Art" },
];

function generateInstagramPhotos() {
  const photos = [];
  for (let i = 1; i <= 122; i++) {
    photos.push({
      src: `/gallery/instagram/ig-${String(i).padStart(3, "0")}.jpg`,
      alt: `Création Instagram ${i}`,
      description: "Création ongulaire Instagram",
      category: "Nail Art",
    });
  }
  for (let i = 123; i <= 565; i++) {
    photos.push({
      src: `/gallery/instagram2/ig-${String(i).padStart(3, "0")}.jpg`,
      alt: `Création Instagram ${i}`,
      description: "Création ongulaire Instagram",
      category: "Nail Art",
    });
  }
  return photos;
}

const ALL_PHOTOS = [...GALLERY_PHOTOS, ...generateInstagramPhotos()];

async function main() {
  console.log("Seeding database...");

  const categoryMap: Record<string, string> = {};
  for (const cat of CATEGORIES) {
    const existing = await prisma.category.findUnique({ where: { slug: cat.slug } });
    const created = existing
      ? await prisma.category.update({ where: { slug: cat.slug }, data: cat })
      : await prisma.category.create({ data: cat });
    categoryMap[cat.name] = created.id;
    console.log(`  Category: ${cat.name} (${created.id})`);
  }

  let count = 0;
  for (const photo of ALL_PHOTOS) {
    const existing = await prisma.image.findUnique({ where: { src: photo.src } });
    const image = existing
      ? await prisma.image.update({ where: { src: photo.src }, data: { alt: photo.alt, description: photo.description } })
      : await prisma.image.create({ data: { src: photo.src, alt: photo.alt, description: photo.description } });

    const categoryId = categoryMap[photo.category];
    if (categoryId) {
      const existingLink = await prisma.imageCategory.findUnique({
        where: { imageId_categoryId: { imageId: image.id, categoryId } },
      });
      if (!existingLink) {
        await prisma.imageCategory.create({ data: { imageId: image.id, categoryId } });
      }
    }

    count++;
    if (count % 100 === 0) {
      console.log(`  Seeded ${count}/${ALL_PHOTOS.length} images...`);
    }
  }

  console.log(`Seeding complete: ${count} images, ${CATEGORIES.length} categories.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
