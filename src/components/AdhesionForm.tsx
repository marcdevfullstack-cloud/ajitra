"use client";

import { useState } from "react";
import { submitAdhesion } from "@/app/(site)/rejoindre/actions";
import { buildAdhesionMessage, buildWhatsAppLink } from "@/lib/whatsapp";
import type { AdhesionInput } from "@/lib/data";

const inputClass =
  "rounded-sm border border-ink-900/15 bg-white px-3 py-2.5 text-sm focus:border-forest-500 focus:outline-none";
const labelClass = "text-sm font-semibold text-ink-900";

type Status = "idle" | "sending" | "success" | "error";

export default function AdhesionForm({ whatsappNumber }: { whatsappNumber: string }) {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const input: AdhesionInput = {
      fullName: String(data.get("fullName") || "").trim(),
      phone: String(data.get("phone") || "").trim(),
      email: String(data.get("email") || "").trim(),
      residence: String(data.get("residence") || "").trim(),
      relation: String(data.get("relation") || "").trim(),
      message: String(data.get("message") || "").trim(),
    };

    if (!input.fullName || !input.phone) return;

    // Ouvert tout de suite (dans le geste utilisateur) pour éviter le bloqueur de pop-up ;
    // on lui donne une destination une fois la demande enregistrée.
    const waWindow = whatsappNumber ? window.open("", "_blank") : null;

    setStatus("sending");
    try {
      await submitAdhesion(input);
    } catch {
      // On garde une trace au mieux ; l'envoi WhatsApp reste utile même si l'enregistrement échoue.
    }

    const waLink = buildWhatsAppLink(whatsappNumber, buildAdhesionMessage(input));
    if (waWindow) {
      if (waLink) {
        waWindow.location.href = waLink;
      } else {
        waWindow.close();
      }
    }

    setStatus("success");
    form.reset();
  }

  if (status === "success") {
    return (
      <div className="rounded-md border border-forest-500/30 bg-forest-100 p-6 text-forest-700">
        <p className="font-display text-lg font-semibold">Demande envoyée, merci !</p>
        <p className="mt-1 text-sm">
          {whatsappNumber
            ? "Un onglet WhatsApp s'est ouvert avec vos informations : il ne vous reste qu'à appuyer sur envoyer."
            : "Votre demande a bien été enregistrée. Nous vous contacterons bientôt."}
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-3 text-sm font-bold text-forest-600 hover:underline"
        >
          Envoyer une autre demande
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <label className={labelClass} htmlFor="fullName">Nom complet *</label>
        <input id="fullName" name="fullName" required className={inputClass} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label className={labelClass} htmlFor="phone">Téléphone *</label>
          <input id="phone" name="phone" type="tel" required className={inputClass} placeholder="07 00 00 00 00" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className={labelClass} htmlFor="email">E-mail</label>
          <input id="email" name="email" type="email" className={inputClass} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label className={labelClass} htmlFor="residence">Ville / quartier de résidence</label>
          <input id="residence" name="residence" className={inputClass} />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className={labelClass} htmlFor="relation">Lien avec Transua</label>
          <select id="relation" name="relation" className={inputClass} defaultValue="Ressortissant(e) de Transua">
            <option>Ressortissant(e) de Transua</option>
            <option>Originaire du Département de Transua</option>
            <option>Sympathisant(e) / Ami(e)</option>
            <option>Autre</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className={labelClass} htmlFor="message">Message (optionnel)</label>
        <textarea id="message" name="message" rows={3} className={inputClass} />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-1 rounded-sm bg-forest-600 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-forest-500 disabled:opacity-60"
      >
        {status === "sending" ? "Envoi en cours…" : "Envoyer ma demande d'adhésion"}
      </button>

      <p className="text-xs text-ink-400">
        {whatsappNumber
          ? "En validant, WhatsApp s'ouvre avec vos informations déjà remplies : il vous suffira d'appuyer sur envoyer."
          : "Votre demande sera enregistrée et transmise au bureau de l'AJTRA."}
      </p>
    </form>
  );
}
