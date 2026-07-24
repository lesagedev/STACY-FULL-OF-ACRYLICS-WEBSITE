export interface Translations {
  nav: {
    about: string; shootings: string; creations: string; services: string; contact: string;
  };
  hero: {
    badge: string; tagline: string; cta_gallery: string; cta_contact: string;
    scroll: string; roles: string[];
  };
  about: {
    label: string; heading: string; name: string;
    parcours: string; vision: string; mission: string;
  };
  shootings: {
    label: string; heading: string; accent: string; sub: string;
  };
  creations: {
    label: string; heading: string; accent: string; sub: string;
    all: string;
  };
  services: {
    label: string; heading: string; accent: string; sub: string;
  };
  vision: {
    label: string; heading: string; accent: string;
  };
  mission: {
    label: string; heading: string; accent: string;
  };
  contact: {
    label: string; heading: string; accent: string; sub: string;
    whatsapp: string; email_label: string; location_label: string;
    form_title: string; form_sub: string; name_placeholder: string;
    email_placeholder: string; message_placeholder: string;
    send: string; sending: string; sent_title: string; sent_sub: string;
  };
  footer: {
    rights: string; made: string;
  };
}

export const fr: Translations = {
  nav: {
    about: "À Propos",
    shootings: "Shootings",
    creations: "Créations",
    services: "Services",
    contact: "Contact",
  },
  hero: {
    badge: "Prothésiste Ongulaire · Gel · Acryl · Nail Art",
    tagline: "Je transforme chaque main en une œuvre d'art. Créations uniques, designs sur-mesure et tendances pour sublimer vos ongles.",
    cta_gallery: "Voir mes Créations",
    cta_contact: "Prendre Rendez-vous",
    scroll: "Découvrir",
    roles: ["Prothésiste Ongulaire", "Nail Artist", "Créatrice de Tendances", "Artiste de la Main"],
  },
  about: {
    label: "À PROPOS",
    heading: "Je suis",
    name: "Stacy.",
    parcours: "Mon Parcours",
    vision: "Vision",
    mission: "Mission",
  },
  shootings: {
    label: "SHOOTINGS",
    heading: "Mes",
    accent: "portraits.",
    sub: "Chaque séance photo capture l'essence de mon art.",
  },
  creations: {
    label: "CRÉATIONS",
    heading: "Mes",
    accent: "créations.",
    sub: "Chaque set est une œuvre d'art unique, réalisée avec passion.",
    all: "Tous",
  },
  services: {
    label: "SERVICES",
    heading: "Ce que je",
    accent: "propose.",
    sub: "Des prestations sur-mesure pour sublimer vos ongles.",
  },
  vision: {
    label: "MA VISION",
    heading: "Réinventer la",
    accent: "beauté.",
  },
  mission: {
    label: "MA MISSION",
    heading: "Donner du sens à",
    accent: "mon art.",
  },
  contact: {
    label: "CONTACT",
    heading: "Envie de beaux ongles ?",
    accent: "Contactez-moi.",
    sub: "Rendez-vous, renseignements ou simplement dire bonjour.",
    whatsapp: "WhatsApp",
    email_label: "Email",
    location_label: "Localisation",
    form_title: "Envoyez-moi un message",
    form_sub: "Je lis tout. Vraiment.",
    name_placeholder: "Votre nom",
    email_placeholder: "Votre email",
    message_placeholder: "Décrivez votre projet…",
    send: "Envoyer",
    sending: "Envoi…",
    sent_title: "Message envoyé !",
    sent_sub: "Je vous réponds rapidement.",
  },
  footer: {
    rights: "Tous droits réservés.",
    made: "Made with love",
  },
};
