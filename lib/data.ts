export const ABOUT = {
  fullName: "CHOUAKÉ DIANA STACY",
  shortBio:
    "Je suis CHOUAKE Diana Stacy prothésiste ongulaire résineuse originaire du Cameroun. Diplômée d'un DTS en esthétique et d'un DQP en Coiffure. Je n'ai pas toujours baigné dans l'univers de la beauté ; par le passé j'étais convaincu que j'avais une carrière brillante en tant qu'infirmière… mais au bout de deux ans je me suis rendue compte qu'il fallait que je vive de ma passion. Depuis toute petite j'ai toujours été douée en dessin, ce qui m'avait valu un prix lors d'un concours de dessin au primaire. Je suis de ceux qui pensent que le bonheur réside autour des détails. Le déclic m'est parvenu ce jour où j'ai vécu mon premier cours d'onglerie donné par un homme utilisant ma couleur préférée pour expliquer l'application du vernis, et des années plus tard cette étincelle brûle toujours dans mon regard.",
  bioIntro: "Mes Salutations",
  bioFull: [
    { text: "Je suis CHOUAKE Diana Stacy ", bold: false },
    { text: "prothésiste ongulaire résineuse", bold: true },
    { text: " originaire du Cameroun. Diplômée d'un DTS en esthétique et d'un DQP en Coiffure. Je n'ai pas toujours baigné dans l'univers de la beauté ; par le passé j'étais convaincue que j'avais une carrière brillante en tant qu'infirmière… mais au bout de deux ans je me suis rendue compte qu'il fallait que je vive de ma ", bold: false },
    { text: "passion", bold: true },
    { text: ". Depuis toute petite j'ai toujours été douée en dessin, ce qui m'avait valu un prix lors d'un concours de dessin au primaire. Je suis de ceux qui pensent que le bonheur réside autour des détails. Le déclic m'est parvenu ce jour où j'ai vécu mon premier cours d'onglerie donné par un homme utilisant ma couleur préférée pour expliquer l'application du vernis, et des années plus tard cette étincelle brûle toujours dans mon regard.", bold: false },
    { text: " J'ai rarement eu le sentiment d'appartenir à un univers différent de celui-ci, un univers dans lequel chaque jour est une agréable découverte de ma personnalité et ma passion pour l'art. Je ne fais pas que ", bold: false },
    { text: "\"poser des ongles\"", bold: true },
    { text: ", c'est un long processus d'apprentissage que je me discipline à suivre avec sourire. Je façonne mon bonheur à redonner le sourire et la ", bold: false },
    { text: "confiance en soi", bold: true },
    { text: " à des femmes qui le méritent. Je tire mon inspiration des autres prothésistes, de la mode, de la nature et aussi de la musique. Je me suis forgée une place dans le monde de l'entrepreneuriat et j'aimerais élargir mes horizons et me plonger dans l'industrie de l'onglerie pour exprimer mon ", bold: false },
    { text: "talent", bold: true },
    { text: " et grandir dans le monde professionnel.", bold: false },
  ],
  parcours: [
    { year: "2016 - 2017", event: "Baccalauréat D — Lycée De Makepé" },
    { year: "2021 / 2022", event: "CFPE DE DOUALA" },
    { year: "", event: "DTS en esthétique (Diplôme de Technicienne Spécialisé) 2ᵉ national" },
    { year: "", event: "DQP en coiffure (Diplôme de Qualification Professionnel) 2ᵉ national" },
  ],
  vision:
    "Créer et innover constamment dans l'industrie de la beauté et être à l'avant-garde de la mode, en créant toujours des tendances dans le 'Nail Art'.",
  mission: [
    "Donner plus de légitimité à la profession de prothésiste ongulaire.",
    "Me prouver que je peux être une femme inspirante.",
    "Satisfaire aux attentes des clients.",
    "Aider les femmes à avoir plus confiance en elles grâce à mon travail.",
  ],
  competences: [
    "Nail artist",
    "Manucure / Pédicure",
    "Soin de pieds / Mains",
    "Make up",
    "Soins Esthétiques Mixtes",
    "Coiffure Femme",
    "Épilation à la cire",
    "Fabrication de Press On Nails",
  ],
  langues: ["Français", "Anglais"],
  photo: "/gallery/stacy-portrait-04-roses.webp",
} as const;

export const EXPERIENCE = [
  {
    year: "2023",
    company: "Esfon Hair",
    role: "Prothésiste Ongulaire Résineuse",
    description:
      "Découvrir et me familiariser au milieu professionnel. Participer à l'évolution de l'industrie des ongles.",
  },
] as const;

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

export interface ProjectPhoto {
  src: string;
  alt: string;
  label: string;
}

export interface Project {
  name: string;
  description: string;
  photos: ProjectPhoto[];
}

export const PROJECTS: Project[] = [
  {
    name: "Projet 1 — Du naturel à l'artistique",
    description: "Transformation complète : de l'ongle naturel à la pose artistique finalisée.",
    photos: [
      { src: "/gallery/projet1-01-initial.jpeg", alt: "Ongles naturels avant la pose", label: "Avant" },
      { src: "/gallery/projet1-02.jpeg", alt: "Étape de construction", label: "Étape 1" },
      { src: "/gallery/projet1-03.jpeg", alt: "Étape de modelage", label: "Étape 2" },
      { src: "/gallery/projet1-04.jpeg", alt: "Étape de préparation", label: "Étape 3" },
      { src: "/gallery/projet1-05-rendu.jpeg", alt: "Rendu presque final", label: "Rendu" },
      { src: "/gallery/projet1-06-final.jpeg", alt: "Pose complète finalisée", label: "Final" },
    ],
  },
  {
    name: "Projet 2 — Pose longue élégante",
    description: "Extensions longues avec finition soignée et design raffiné.",
    photos: [
      { src: "/gallery/projet2-01.jpeg", alt: "Début de pose", label: "Début" },
      { src: "/gallery/projet2-02.jpeg", alt: "Construction en cours", label: "Étape 1" },
      { src: "/gallery/projet2-03.jpeg", alt: "Affinage du shape", label: "Étape 2" },
      { src: "/gallery/projet2-04.jpeg", alt: "Rendu final", label: "Final" },
    ],
  },
  {
    name: "Projet 3",
    description: "Ensemble de créations ongulaires.",
    photos: [
      { src: "/gallery/projet3-01.jpeg", alt: "Création 1", label: "Vue 1" },
      { src: "/gallery/projet3-02.jpeg", alt: "Création 2", label: "Vue 2" },
    ],
  },
  {
    name: "Projet 4 — Pose artistique",
    description: "Création artistique avec design sur mesure et finition impeccable.",
    photos: [
      { src: "/gallery/projet04-01.jpeg", alt: "Début de pose", label: "Début" },
      { src: "/gallery/projet04-02.jpeg", alt: "Construction en cours", label: "Étape 1" },
      { src: "/gallery/projet04-03.jpeg", alt: "Rendu final", label: "Final" },
    ],
  },
  {
    name: "Projet 5 — Set complet",
    description: "Pose complète avec nail art détaillé et finition professionnelle.",
    photos: [
      { src: "/gallery/projet5-01.jpeg", alt: "Préparation", label: "Début" },
      { src: "/gallery/projet5-02.jpeg", alt: "Construction", label: "Étape 1" },
      { src: "/gallery/projet5-03.jpeg", alt: "Décoration", label: "Étape 2" },
      { src: "/gallery/projet5-04.jpeg", alt: "Affinage", label: "Étape 3" },
      { src: "/gallery/projet5-05.jpeg", alt: "Détails finaux", label: "Étape 4" },
      { src: "/gallery/projet5-06.jpeg", alt: "Rendu final", label: "Final" },
    ],
  },
];

export interface GalleryPhoto {
  src: string;
  alt: string;
  description: string;
  category: "Gel" | "Acryl" | "Nail Art";
}

export const GALLERY_PHOTOS: GalleryPhoto[] = [
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
  { src: "/gallery/instagram/ig-001.jpg", alt: "Création Instagram 1", description: "Création ongulaire Instagram", category: "Nail Art" },
  { src: "/gallery/instagram/ig-002.jpg", alt: "Création Instagram 2", description: "Création ongulaire Instagram", category: "Nail Art" },
  { src: "/gallery/instagram/ig-003.jpg", alt: "Création Instagram 3", description: "Création ongulaire Instagram", category: "Nail Art" },
  { src: "/gallery/instagram/ig-004.jpg", alt: "Création Instagram 4", description: "Création ongulaire Instagram", category: "Nail Art" },
  { src: "/gallery/instagram/ig-005.jpg", alt: "Création Instagram 5", description: "Création ongulaire Instagram", category: "Nail Art" },
  { src: "/gallery/instagram/ig-006.jpg", alt: "Création Instagram 6", description: "Création ongulaire Instagram", category: "Nail Art" },
  { src: "/gallery/instagram/ig-007.jpg", alt: "Création Instagram 7", description: "Création ongulaire Instagram", category: "Nail Art" },
  { src: "/gallery/instagram/ig-008.jpg", alt: "Création Instagram 8", description: "Création ongulaire Instagram", category: "Nail Art" },
  { src: "/gallery/instagram/ig-009.jpg", alt: "Création Instagram 9", description: "Création ongulaire Instagram", category: "Nail Art" },
  { src: "/gallery/instagram/ig-010.jpg", alt: "Création Instagram 10", description: "Création ongulaire Instagram", category: "Nail Art" },
  { src: "/gallery/instagram/ig-011.jpg", alt: "Création Instagram 11", description: "Création ongulaire Instagram", category: "Nail Art" },
  { src: "/gallery/instagram/ig-012.jpg", alt: "Création Instagram 12", description: "Création ongulaire Instagram", category: "Nail Art" },
  { src: "/gallery/instagram/ig-013.jpg", alt: "Création Instagram 13", description: "Création ongulaire Instagram", category: "Nail Art" },
  { src: "/gallery/instagram/ig-014.jpg", alt: "Création Instagram 14", description: "Création ongulaire Instagram", category: "Nail Art" },
  { src: "/gallery/instagram/ig-015.jpg", alt: "Création Instagram 15", description: "Création ongulaire Instagram", category: "Nail Art" },
  { src: "/gallery/instagram/ig-016.jpg", alt: "Création Instagram 16", description: "Création ongulaire Instagram", category: "Nail Art" },
  { src: "/gallery/instagram/ig-017.jpg", alt: "Création Instagram 17", description: "Création ongulaire Instagram", category: "Nail Art" },
  { src: "/gallery/instagram/ig-018.jpg", alt: "Création Instagram 18", description: "Création ongulaire Instagram", category: "Nail Art" },
  { src: "/gallery/instagram/ig-019.jpg", alt: "Création Instagram 19", description: "Création ongulaire Instagram", category: "Nail Art" },
  { src: "/gallery/instagram/ig-020.jpg", alt: "Création Instagram 20", description: "Création ongulaire Instagram", category: "Nail Art" },
  { src: "/gallery/instagram/ig-021.jpg", alt: "Création Instagram 21", description: "Création ongulaire Instagram", category: "Nail Art" },
  { src: "/gallery/instagram/ig-022.jpg", alt: "Création Instagram 22", description: "Création ongulaire Instagram", category: "Nail Art" },
  { src: "/gallery/instagram/ig-023.jpg", alt: "Création Instagram 23", description: "Création ongulaire Instagram", category: "Nail Art" },
  { src: "/gallery/instagram/ig-024.jpg", alt: "Création Instagram 24", description: "Création ongulaire Instagram", category: "Nail Art" },
  { src: "/gallery/instagram/ig-025.jpg", alt: "Création Instagram 25", description: "Création ongulaire Instagram", category: "Nail Art" },
  { src: "/gallery/instagram/ig-026.jpg", alt: "Création Instagram 26", description: "Création ongulaire Instagram", category: "Nail Art" },
  { src: "/gallery/instagram/ig-027.jpg", alt: "Création Instagram 27", description: "Création ongulaire Instagram", category: "Nail Art" },
  { src: "/gallery/instagram/ig-028.jpg", alt: "Création Instagram 28", description: "Création ongulaire Instagram", category: "Nail Art" },
  { src: "/gallery/instagram/ig-029.jpg", alt: "Création Instagram 29", description: "Création ongulaire Instagram", category: "Nail Art" },
  { src: "/gallery/instagram/ig-030.jpg", alt: "Création Instagram 30", description: "Création ongulaire Instagram", category: "Nail Art" },
  { src: "/gallery/instagram/ig-031.jpg", alt: "Création Instagram 31", description: "Création ongulaire Instagram", category: "Nail Art" },
  { src: "/gallery/instagram/ig-032.jpg", alt: "Création Instagram 32", description: "Création ongulaire Instagram", category: "Nail Art" },
  { src: "/gallery/instagram/ig-033.jpg", alt: "Création Instagram 33", description: "Création ongulaire Instagram", category: "Nail Art" },
  { src: "/gallery/instagram/ig-034.jpg", alt: "Création Instagram 34", description: "Création ongulaire Instagram", category: "Nail Art" },
  { src: "/gallery/instagram/ig-035.jpg", alt: "Création Instagram 35", description: "Création ongulaire Instagram", category: "Nail Art" },
  { src: "/gallery/instagram/ig-036.jpg", alt: "Création Instagram 36", description: "Création ongulaire Instagram", category: "Nail Art" },
  { src: "/gallery/instagram/ig-037.jpg", alt: "Création Instagram 37", description: "Création ongulaire Instagram", category: "Nail Art" },
  { src: "/gallery/instagram/ig-038.jpg", alt: "Création Instagram 38", description: "Création ongulaire Instagram", category: "Nail Art" },
  { src: "/gallery/instagram/ig-039.jpg", alt: "Création Instagram 39", description: "Création ongulaire Instagram", category: "Nail Art" },
  { src: "/gallery/instagram/ig-040.jpg", alt: "Création Instagram 40", description: "Création ongulaire Instagram", category: "Nail Art" },
  { src: "/gallery/instagram/ig-041.jpg", alt: "Création Instagram 41", description: "Création ongulaire Instagram", category: "Nail Art" },
  { src: "/gallery/instagram/ig-042.jpg", alt: "Création Instagram 42", description: "Création ongulaire Instagram", category: "Nail Art" },
  { src: "/gallery/instagram/ig-043.jpg", alt: "Création Instagram 43", description: "Création ongulaire Instagram", category: "Nail Art" },
  { src: "/gallery/instagram/ig-044.jpg", alt: "Création Instagram 44", description: "Création ongulaire Instagram", category: "Nail Art" },
  { src: "/gallery/instagram/ig-045.jpg", alt: "Création Instagram 45", description: "Création ongulaire Instagram", category: "Nail Art" },
  { src: "/gallery/instagram/ig-046.jpg", alt: "Création Instagram 46", description: "Création ongulaire Instagram", category: "Nail Art" },
  { src: "/gallery/instagram/ig-047.jpg", alt: "Création Instagram 47", description: "Création ongulaire Instagram", category: "Nail Art" },
  { src: "/gallery/instagram/ig-048.jpg", alt: "Création Instagram 48", description: "Création ongulaire Instagram", category: "Nail Art" },
  { src: "/gallery/instagram/ig-049.jpg", alt: "Création Instagram 49", description: "Création ongulaire Instagram", category: "Nail Art" },
  { src: "/gallery/instagram/ig-050.jpg", alt: "Création Instagram 50", description: "Création ongulaire Instagram", category: "Nail Art" },
  { src: "/gallery/instagram/ig-051.jpg", alt: "Création Instagram 51", description: "Création ongulaire Instagram", category: "Nail Art" },
  { src: "/gallery/instagram/ig-052.jpg", alt: "Création Instagram 52", description: "Création ongulaire Instagram", category: "Nail Art" },
  { src: "/gallery/instagram/ig-053.jpg", alt: "Création Instagram 53", description: "Création ongulaire Instagram", category: "Nail Art" },
  { src: "/gallery/instagram/ig-054.jpg", alt: "Création Instagram 54", description: "Création ongulaire Instagram", category: "Nail Art" },
  { src: "/gallery/instagram/ig-055.jpg", alt: "Création Instagram 55", description: "Création ongulaire Instagram", category: "Nail Art" },
  { src: "/gallery/instagram/ig-056.jpg", alt: "Création Instagram 56", description: "Création ongulaire Instagram", category: "Nail Art" },
  { src: "/gallery/instagram/ig-057.jpg", alt: "Création Instagram 57", description: "Création ongulaire Instagram", category: "Nail Art" },
  { src: "/gallery/instagram/ig-058.jpg", alt: "Création Instagram 58", description: "Création ongulaire Instagram", category: "Nail Art" },
  { src: "/gallery/instagram/ig-059.jpg", alt: "Création Instagram 59", description: "Création ongulaire Instagram", category: "Nail Art" },
  { src: "/gallery/instagram/ig-060.jpg", alt: "Création Instagram 60", description: "Création ongulaire Instagram", category: "Nail Art" },
  { src: "/gallery/instagram/ig-061.jpg", alt: "Création Instagram 61", description: "Création ongulaire Instagram", category: "Nail Art" },
  { src: "/gallery/instagram/ig-062.jpg", alt: "Création Instagram 62", description: "Création ongulaire Instagram", category: "Nail Art" },
  { src: "/gallery/instagram/ig-063.jpg", alt: "Création Instagram 63", description: "Création ongulaire Instagram", category: "Nail Art" },
  { src: "/gallery/instagram/ig-064.jpg", alt: "Création Instagram 64", description: "Création ongulaire Instagram", category: "Nail Art" },
  { src: "/gallery/instagram/ig-065.jpg", alt: "Création Instagram 65", description: "Création ongulaire Instagram", category: "Nail Art" },
  { src: "/gallery/instagram/ig-066.jpg", alt: "Création Instagram 66", description: "Création ongulaire Instagram", category: "Nail Art" },
  { src: "/gallery/instagram/ig-067.jpg", alt: "Création Instagram 67", description: "Création ongulaire Instagram", category: "Nail Art" },
  { src: "/gallery/instagram/ig-068.jpg", alt: "Création Instagram 68", description: "Création ongulaire Instagram", category: "Nail Art" },
  { src: "/gallery/instagram/ig-069.jpg", alt: "Création Instagram 69", description: "Création ongulaire Instagram", category: "Nail Art" },
  { src: "/gallery/instagram/ig-070.jpg", alt: "Création Instagram 70", description: "Création ongulaire Instagram", category: "Nail Art" },
  { src: "/gallery/instagram/ig-071.jpg", alt: "Création Instagram 71", description: "Création ongulaire Instagram", category: "Nail Art" },
  { src: "/gallery/instagram/ig-072.jpg", alt: "Création Instagram 72", description: "Création ongulaire Instagram", category: "Nail Art" },
  { src: "/gallery/instagram/ig-073.jpg", alt: "Création Instagram 73", description: "Création ongulaire Instagram", category: "Nail Art" },
  { src: "/gallery/instagram/ig-074.jpg", alt: "Création Instagram 74", description: "Création ongulaire Instagram", category: "Nail Art" },
  { src: "/gallery/instagram/ig-075.jpg", alt: "Création Instagram 75", description: "Création ongulaire Instagram", category: "Nail Art" },
  { src: "/gallery/instagram/ig-076.jpg", alt: "Création Instagram 76", description: "Création ongulaire Instagram", category: "Nail Art" },
  { src: "/gallery/instagram/ig-077.jpg", alt: "Création Instagram 77", description: "Création ongulaire Instagram", category: "Nail Art" },
  { src: "/gallery/instagram/ig-078.jpg", alt: "Création Instagram 78", description: "Création ongulaire Instagram", category: "Nail Art" },
  { src: "/gallery/instagram/ig-079.jpg", alt: "Création Instagram 79", description: "Création ongulaire Instagram", category: "Nail Art" },
  { src: "/gallery/instagram/ig-080.jpg", alt: "Création Instagram 80", description: "Création ongulaire Instagram", category: "Nail Art" },
  { src: "/gallery/instagram/ig-081.jpg", alt: "Création Instagram 81", description: "Création ongulaire Instagram", category: "Nail Art" },
  { src: "/gallery/instagram/ig-082.jpg", alt: "Création Instagram 82", description: "Création ongulaire Instagram", category: "Nail Art" },
  { src: "/gallery/instagram/ig-083.jpg", alt: "Création Instagram 83", description: "Création ongulaire Instagram", category: "Nail Art" },
  { src: "/gallery/instagram/ig-084.jpg", alt: "Création Instagram 84", description: "Création ongulaire Instagram", category: "Nail Art" },
  { src: "/gallery/instagram/ig-085.jpg", alt: "Création Instagram 85", description: "Création ongulaire Instagram", category: "Nail Art" },
  { src: "/gallery/instagram/ig-086.jpg", alt: "Création Instagram 86", description: "Création ongulaire Instagram", category: "Nail Art" },
  { src: "/gallery/instagram/ig-087.jpg", alt: "Création Instagram 87", description: "Création ongulaire Instagram", category: "Nail Art" },
  { src: "/gallery/instagram/ig-088.jpg", alt: "Création Instagram 88", description: "Création ongulaire Instagram", category: "Nail Art" },
  { src: "/gallery/instagram/ig-089.jpg", alt: "Création Instagram 89", description: "Création ongulaire Instagram", category: "Nail Art" },
  { src: "/gallery/instagram/ig-090.jpg", alt: "Création Instagram 90", description: "Création ongulaire Instagram", category: "Nail Art" },
  { src: "/gallery/instagram/ig-091.jpg", alt: "Création Instagram 91", description: "Création ongulaire Instagram", category: "Nail Art" },
  { src: "/gallery/instagram/ig-092.jpg", alt: "Création Instagram 92", description: "Création ongulaire Instagram", category: "Nail Art" },
  { src: "/gallery/instagram/ig-093.jpg", alt: "Création Instagram 93", description: "Création ongulaire Instagram", category: "Nail Art" },
  { src: "/gallery/instagram/ig-094.jpg", alt: "Création Instagram 94", description: "Création ongulaire Instagram", category: "Nail Art" },
  { src: "/gallery/instagram/ig-095.jpg", alt: "Création Instagram 95", description: "Création ongulaire Instagram", category: "Nail Art" },
  { src: "/gallery/instagram/ig-096.jpg", alt: "Création Instagram 96", description: "Création ongulaire Instagram", category: "Nail Art" },
  { src: "/gallery/instagram/ig-097.jpg", alt: "Création Instagram 97", description: "Création ongulaire Instagram", category: "Nail Art" },
  { src: "/gallery/instagram/ig-098.jpg", alt: "Création Instagram 98", description: "Création ongulaire Instagram", category: "Nail Art" },
  { src: "/gallery/instagram/ig-099.jpg", alt: "Création Instagram 99", description: "Création ongulaire Instagram", category: "Nail Art" },
  { src: "/gallery/instagram/ig-100.jpg", alt: "Création Instagram 100", description: "Création ongulaire Instagram", category: "Nail Art" },
  { src: "/gallery/instagram/ig-101.jpg", alt: "Création Instagram 101", description: "Création ongulaire Instagram", category: "Nail Art" },
  { src: "/gallery/instagram/ig-102.jpg", alt: "Création Instagram 102", description: "Création ongulaire Instagram", category: "Nail Art" },
  { src: "/gallery/instagram/ig-103.jpg", alt: "Création Instagram 103", description: "Création ongulaire Instagram", category: "Nail Art" },
  { src: "/gallery/instagram/ig-104.jpg", alt: "Création Instagram 104", description: "Création ongulaire Instagram", category: "Nail Art" },
  { src: "/gallery/instagram/ig-105.jpg", alt: "Création Instagram 105", description: "Création ongulaire Instagram", category: "Nail Art" },
  { src: "/gallery/instagram/ig-106.jpg", alt: "Création Instagram 106", description: "Création ongulaire Instagram", category: "Nail Art" },
  { src: "/gallery/instagram/ig-107.jpg", alt: "Création Instagram 107", description: "Création ongulaire Instagram", category: "Nail Art" },
  { src: "/gallery/instagram/ig-108.jpg", alt: "Création Instagram 108", description: "Création ongulaire Instagram", category: "Nail Art" },
  { src: "/gallery/instagram/ig-109.jpg", alt: "Création Instagram 109", description: "Création ongulaire Instagram", category: "Nail Art" },
  { src: "/gallery/instagram/ig-110.jpg", alt: "Création Instagram 110", description: "Création ongulaire Instagram", category: "Nail Art" },
  { src: "/gallery/instagram/ig-111.jpg", alt: "Création Instagram 111", description: "Création ongulaire Instagram", category: "Nail Art" },
  { src: "/gallery/instagram/ig-112.jpg", alt: "Création Instagram 112", description: "Création ongulaire Instagram", category: "Nail Art" },
  { src: "/gallery/instagram/ig-113.jpg", alt: "Création Instagram 113", description: "Création ongulaire Instagram", category: "Nail Art" },
  { src: "/gallery/instagram/ig-114.jpg", alt: "Création Instagram 114", description: "Création ongulaire Instagram", category: "Nail Art" },
  { src: "/gallery/instagram/ig-115.jpg", alt: "Création Instagram 115", description: "Création ongulaire Instagram", category: "Nail Art" },
  { src: "/gallery/instagram/ig-116.jpg", alt: "Création Instagram 116", description: "Création ongulaire Instagram", category: "Nail Art" },
  { src: "/gallery/instagram/ig-117.jpg", alt: "Création Instagram 117", description: "Création ongulaire Instagram", category: "Nail Art" },
  { src: "/gallery/instagram/ig-118.jpg", alt: "Création Instagram 118", description: "Création ongulaire Instagram", category: "Nail Art" },
  { src: "/gallery/instagram/ig-119.jpg", alt: "Création Instagram 119", description: "Création ongulaire Instagram", category: "Nail Art" },
  { src: "/gallery/instagram/ig-120.jpg", alt: "Création Instagram 120", description: "Création ongulaire Instagram", category: "Nail Art" },
  { src: "/gallery/instagram/ig-121.jpg", alt: "Création Instagram 121", description: "Création ongulaire Instagram", category: "Nail Art" },
  { src: "/gallery/instagram/ig-122.jpg", alt: "Création Instagram 122", description: "Création ongulaire Instagram", category: "Nail Art" },
];

export const GALLERY_CATEGORIES = ["Tous", "Gel", "Acryl", "Nail Art"] as const;

export const SHOOTING_PHOTOS = [
  { src: "/gallery/stacy-portrait-01.webp", alt: "Portrait Stacy 1" },
  { src: "/gallery/stacy-portrait-02.webp", alt: "Portrait Stacy 2" },
  { src: "/gallery/stacy-portrait-03.webp", alt: "Portrait Stacy 3" },
  { src: "/gallery/stacy-portrait-04-roses.webp", alt: "Portrait Stacy avec roses" },
  { src: "/gallery/stacy-portrait-05-nailart.webp", alt: "Portrait Stacy nail art" },
];

export const SOCIAL_STATS = [
  { platform: "Instagram", handle: "@stacyfullofacrylics", count: "15.2K", color: "from-purple-500 via-pink-500 to-orange-400" },
  { platform: "TikTok", handle: "@stacyfullnails", count: "48.7K", color: "#1A1A1A" },
  { platform: "Snapchat", handle: "@stacyfull", count: "8.3K", color: "#FFFC00" },
];

export const VISION = {
  title: "Ma Vision",
  text: "Créer et innover constamment dans l'industrie de la beauté et être à l'avant-garde de la mode, en créant toujours des tendances dans le 'Nail Art'.",
  image: SHOOTING_PHOTOS[3].src,
} as const;

export const MISSION = {
  title: "Ma Mission",
  items: [
    "Donner plus de légitimité à la profession de prothésiste ongulaire.",
    "Me prouver que je peux être une femme inspirante.",
    "Satisfaire aux attentes des clients.",
    "Aider les femmes à avoir plus confiance en elles grâce à mon travail.",
  ],
  image: SHOOTING_PHOTOS[3].src,
} as const;

export const CONTACT = {
  phone: "672461121",
  email: "cchouakedianastacy@gmail.com",
  location: "LOGPOM COLLEGE LE NIL\nOU LOGBESSOU STATION NICKEL OIL",
  whatsapp: "https://wa.me/message/Q66A6EE7D7HME1",
  instagram: "https://www.instagram.com/stacyfullofacrylics?igsh=MzE2cGZ2cHYya3Nx&utm_source=qr",
  tiktok: "https://www.tiktok.com/@stacyfullnails",
  snapchat: "https://www.snapchat.com/add/stacyfull",
} as const;
