/* ================================================================
   STACY FULL OF ACRYLICS — Central data file
   Prothésiste Ongulaire · Résineuse · Nail Art
=============================================================== */

export const ABOUT = {
  fullName: "Chouaké Diana Stacy",
  shortBio:
    "Je suis CHOUAKE Diana Stacy prothésiste ongulaire résineuse originaire du Cameroun. Diplômée d'un DTS en esthétique et d'un DQP en Coiffure. Je n'ai pas toujours baigné dans l'univers de la beauté ; par le passé j'étais convaincu que j'avais une carrière brillante en tant qu'infirmière… mais au bout de deux ans je me suis rendue compte qu'il fallait que je vive de ma passion. Depuis toute petite j'ai toujours été douée en dessin, ce qui m'avait valu un prix lors d'un concours de dessin au primaire. Je suis de ceux qui pensent que le bonheur réside autour des détails. Le déclic m'est parvenu ce jour où j'ai vécu mon premier cours d'onglerie donné par un homme utilisant ma couleur préférée pour expliquer l'application du vernis, et 4 ans plus tard cette étincelle brûle toujours dans mon regard.",
  parcours: [
    { year: "2016 - 2017", event: "Baccalauréat D — Lycée De Makepé" },
    { year: "2018 - 2019", event: "DTS en esthétique" },
    { year: "2019 - 2020", event: "DQP en coiffure" },
    { year: "2021 - 2022", event: "CFPE DE DOUALA — Prothésiste Ongulaire Résineuse" },
  ],
  vision:
    "Créer et innover constamment dans l'industrie de la beauté et être à l'avant-garde de la mode, en créant toujours des tendances dans le 'Nail Art'.",
  mission: [
    "Donner plus de légitimité à la profession de prothésiste ongulaire.",
    "Me prouver que je peux être une femme inspirante.",
    "Satisfaire aux attentes des clients.",
    "Aider les femmes à avoir plus confiance en elles grâce à mon travail.",
  ],
  competences: ["Dynamique", "Entrepreanante", "Autodidacte", "Passionnée"],
  langues: ["Français", "Anglais"],
  centresInteret: [
    "Nail artist",
    "Manucure / Pédicure",
    "Soin de pieds / Mains",
    "Make up",
    "Soins Esthétiques Mixtes",
    "Coiffure Femme",
    "Épilation à la cire",
  ],
  photo: "/gallery/stacy-portrait-04-roses.webp",
} as const;

/* ── EXPÉRIENCE ─────────────────────────────────────────────────── */
export const EXPERIENCE = [
  {
    year: "Janvier 2023",
    company: "Esfon Hair",
    role: "Prothésiste Ongulaire Résineuse",
    description:
      "Découvrir et me familiariser au milieu professionnel. Participer à l'évolution de l'industrie des ongles.",
  },
] as const;

/* ── SERVICES ─────────────────────────────────────────────────── */
export const SERVICES = [
  {
    title: "Pose Complète",
    description:
      "Extensions gel, acryl ou capsules sur mesure. Pose complète avec décoloration, mise en forme et finition parfaite.",
    features: ["Gel", "Acryl", "Capsules", "Refill"],
    icon: "nails",
  },
  {
    title: "Nail Art & Décoration",
    description:
      "Designs créatifs, pierres, strass, motifs sur mesure. Chaque set est une œuvre d'art unique qui vous ressemble.",
    features: ["Strass & Pierres", "Motifs Peints", "Effets Speciaux", "Tendances"],
    icon: "sparkles",
  },
] as const;

/* ── GALLERY ───────────────────────────────────────────────────── */
export interface GalleryPhoto {
  src: string;
  alt: string;
  description: string;
}

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  { src: "/gallery/creation-ongulaire-01.webp", alt: "Création ongulaire animal print", description: "Construction résine nude taille L forme carré + tigé orange + zèbre + strass" },
  { src: "/gallery/creation-ongulaire-02.webp", alt: "Nail art animal print angle différent", description: "Construction résine nude taille L forme carré + tigé orange + zèbre + strass" },
  { src: "/gallery/creation-ongulaire-03.webp", alt: "Nail art violet à pois", description: "Vernis gel violet avec pois blancs et studs dorés" },
  { src: "/gallery/creation-ongulaire-04.webp", alt: "Création florale tropicale", description: "Construction résine nude taille L forme carré + zèbre + fleurs 3D orange" },
  { src: "/gallery/creation-ongulaire-05.webp", alt: "Nail art floral angle différent", description: "Construction résine nude taille L forme carré + zèbre + fleurs 3D orange" },
  { src: "/gallery/creation-ongulaire-06.webp", alt: "French bleu nuage", description: "Construction résine nude taille M forme carré + French bleu nuage + charme doré" },
  { src: "/gallery/creation-ongulaire-07.webp", alt: "Création artistique bourgogne", description: "Construction résine amande taille L + bourgogne + feuilles dorées + fleurs" },
  { src: "/gallery/creation-ongulaire-08.webp", alt: "Nail art artistic detail", description: "Construction résine amande taille L + bourgogne + feuilles dorées + fleurs" },
  { src: "/gallery/creation-ongulaire-09.webp", alt: "French élégante bourgogne", description: "Construction résine stiletto taille L + bourgogne + blanc + croco + studs" },
  { src: "/gallery/creation-ongulaire-10.webp", alt: "French élégante deux mains", description: "Construction résine stiletto taille L + bourgogne + blanc + croco + studs" },
  { src: "/gallery/creation-ongulaire-11.webp", alt: "Cat eye magnétique vert", description: "Construction résine amande taille M + nude + vert chat magnétique" },
  { src: "/gallery/creation-ongulaire-12.webp", alt: "Cat eye magnétique detail", description: "Construction résine amande taille M + nude + vert chat magnétique" },
  { src: "/gallery/creation-ongulaire-13.webp", alt: "Flammes vibrant", description: "Construction résine stiletto taille XL + flammes rose/orange/jaune sur nude" },
  { src: "/gallery/creation-ongulaire-14.webp", alt: "Nail art rose avec nœud 3D", description: "Construction résine taille M forme carré + rose/blanc + nœud papillon 3D + cœur" },
  { src: "/gallery/creation-ongulaire-15.webp", alt: "French lilas feuilles", description: "Construction résine taille L forme carré + French lilas + feuilles noires + paillettes" },
  { src: "/gallery/creation-ongulaire-16-popart.webp", alt: "Nail art pop art coloré", description: "Construction résine taille XL forme carré + nail art pop art coloré (fleurs, visages)" },
] as const;

export const GALLERY_CATEGORIES = ["Tous", "Gel", "Acryl", "Nail Art"] as const;

/* ── CONTACT ───────────────────────────────────────────────────── */
export const CONTACT = {
  phones: ["+(237): 620-974-480", "+(237):693-728-883"],
  email: "chouakedianastacy@gmail.com",
  location: "Logpom - Douala, Cameroun",
  instagram: "https://www.instagram.com/stacyfullofacrylics?igsh=MzE2cGZ2cHYya3Nx&utm_source=qr",
  tiktok: "https://www.tiktok.com/@stacyfullnails",
  snapchat: "https://www.snapchat.com/add/stacyfull",
} as const;
