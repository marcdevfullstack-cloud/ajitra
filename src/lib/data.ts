export type SiteSettings = {
  name: string;
  fullName: string;
  tagline: string;
  slogan: { brong: string; fr: string };
  mission: string[];
  callToJoin: string;
  meetings: { frequency: string; time: string; place: string };
  contact: { facebook: string; whatsapp: string; whatsappNumber: string; email: string };
};

export const site: SiteSettings = {
  name: "AJTRA",
  fullName: "Amicale des Jeunes de Transua",
  tagline: "Unis pour le développement de Transua !",
  slogan: {
    brong: "Sɛ biakun wɛri adro a, ɔ gu",
    fr: "Si une seule personne enlève l'écorce d'un arbre, elle la perd.",
  },
  mission: [
    "L'Amicale des Jeunes de Transua (AJTRA) regroupe en son sein des jeunes filles et garçons ressortissants de Transua.",
    "Son objectif est de regrouper, entretenir les relations fraternelles et la solidarité entre les fils et filles de ce village.",
    "Juste pour dire que l'union fait la force. Alors pourquoi ne pas nous unir ?",
  ],
  callToJoin:
    "Si vous êtes ressortissant(e) de Transua ou du Département de Transua, cette amicale est la vôtre : elle a besoin de vous, et de nous, pour vivre. Sachez que nous sommes très heureux de vous recevoir.",
  meetings: {
    frequency: "Le 2ème dimanche de chaque mois",
    time: "10h00",
    place: "Adjamé, Collège Victor Schoelcher",
  },
  contact: {
    facebook: "https://www.facebook.com/amicale.ajtra",
    whatsapp: "", // à renseigner dès que le lien du groupe sera disponible
    whatsappNumber: "", // numéro qui reçoit les demandes d'adhésion (ex : 2250102030405)
    email: "",
  },
};

export type BureauMember = {
  role: string;
  name: string;
  photoUrl?: string;
  memberSince?: number;
};

export const bureau: BureauMember[] = [
  { role: "Président(e)", name: "À compléter" },
  { role: "Vice-Président(e)", name: "À compléter" },
  { role: "Secrétaire Général(e)", name: "À compléter" },
  { role: "Trésorier(ère)", name: "À compléter" },
  { role: "Chargé(e) de communication", name: "À compléter" },
  { role: "Chargé(e) de l'organisation", name: "À compléter" },
];

export type Event = {
  id: string;
  title: string;
  dateLabel: string;
  isoDate: string;
  time?: string;
  place: string;
  description: string;
  image: string;
  sortOrder?: number;
};

export const events: Event[] = [
  {
    id: "rencontre-koffi-claude-leblanc",
    title: "Rencontre avec M. Koffi Claude Leblanc",
    dateLabel: "Dimanche 10 mai 2026",
    isoDate: "2026-05-10",
    time: "10h00",
    place: "Adjamé, 220 Logements",
    description:
      "L'AJTRA reçoit M. Koffi Claude Leblanc, cadre et fils de Transua, pour un moment d'échange fraternel.",
    image: "/images/event-1.jpg",
  },
  {
    id: "conference-debat-nouvelle-mentalite",
    title: "Conférence-débat — Construire une nouvelle mentalité pour bâtir un futur prospère",
    dateLabel: "Dimanche 7 juin 2026",
    isoDate: "2026-06-07",
    time: "11h00 GMT",
    place: "Grand-Bassam, Côte d'Ivoire",
    description:
      "Une rencontre inspirante pour Transua. Conférencier d'honneur : M. Adoua Kouassi, cadre et fils de Transua.",
    image: "/images/event-2.jpg",
  },
  {
    id: "ceremonie-fin-de-mandat",
    title: "Cérémonie de fin de mandat & sortie détente",
    dateLabel: "Dimanche 7 juin 2026",
    isoDate: "2026-06-07",
    place: "Grand-Bassam, Côte d'Ivoire",
    description:
      "Au programme : conférence, bilan de mandat, échanges. Participation : 5 000 FCFA.",
    image: "/images/event-3.jpg",
  },
];

export type GalleryPhoto = {
  src: string;
  caption: string;
};

export const gallery: GalleryPhoto[] = [];

export type AdhesionInput = {
  fullName: string;
  phone: string;
  email?: string;
  residence?: string;
  relation?: string;
  message?: string;
};
