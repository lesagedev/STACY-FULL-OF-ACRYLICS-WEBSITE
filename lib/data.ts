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
