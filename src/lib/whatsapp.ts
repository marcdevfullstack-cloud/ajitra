import type { AdhesionInput } from "@/lib/data";

export function buildAdhesionMessage(input: AdhesionInput): string {
  const lines = [
    "Bonjour AJTRA, je souhaite adhérer à l'amicale.",
    "",
    `Nom complet : ${input.fullName}`,
    `Téléphone : ${input.phone}`,
  ];
  if (input.email) lines.push(`E-mail : ${input.email}`);
  if (input.residence) lines.push(`Résidence : ${input.residence}`);
  if (input.relation) lines.push(`Lien avec Transua : ${input.relation}`);
  if (input.message) lines.push(`Message : ${input.message}`);
  return lines.join("\n");
}

export function buildWhatsAppLink(rawNumber: string, message: string): string | null {
  const digits = rawNumber.replace(/[^\d]/g, "");
  if (!digits) return null;
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
