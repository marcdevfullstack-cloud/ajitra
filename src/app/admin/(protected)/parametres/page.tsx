import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/queries";
import { updateSettings } from "./actions";

export const metadata: Metadata = { title: "Paramètres — Administration" };
export const dynamic = "force-dynamic";

const inputClass =
  "rounded-sm border border-ink-900/15 bg-white px-3 py-2 text-sm focus:border-forest-500 focus:outline-none";
const labelClass = "text-xs font-semibold text-ink-600";

export default async function AdminParametresPage() {
  const site = await getSiteSettings();

  return (
    <div>
      <h1 className="text-2xl font-bold text-ink-900">Paramètres</h1>
      <p className="mt-1 text-ink-600">Mission, slogan, réunions et liens de contact.</p>

      <form action={updateSettings} className="mt-8 flex max-w-2xl flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <label className={labelClass} htmlFor="tagline">Devise courte</label>
          <input id="tagline" name="tagline" defaultValue={site.tagline} className={inputClass} />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label className={labelClass} htmlFor="sloganBrong">Slogan (langue brong)</label>
            <input id="sloganBrong" name="sloganBrong" defaultValue={site.slogan.brong} className={inputClass} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className={labelClass} htmlFor="sloganFr">Traduction française</label>
            <input id="sloganFr" name="sloganFr" defaultValue={site.slogan.fr} className={inputClass} />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className={labelClass} htmlFor="mission">
            Mission (un paragraphe par bloc, séparez les paragraphes par une ligne vide)
          </label>
          <textarea
            id="mission"
            name="mission"
            rows={8}
            defaultValue={site.mission.join("\n\n")}
            className={inputClass}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className={labelClass} htmlFor="callToJoin">Message d&apos;invitation à rejoindre</label>
          <textarea id="callToJoin" name="callToJoin" rows={3} defaultValue={site.callToJoin} className={inputClass} />
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="flex flex-col gap-1.5">
            <label className={labelClass} htmlFor="meetingFrequency">Réunions — fréquence</label>
            <input id="meetingFrequency" name="meetingFrequency" defaultValue={site.meetings.frequency} className={inputClass} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className={labelClass} htmlFor="meetingTime">Heure</label>
            <input id="meetingTime" name="meetingTime" defaultValue={site.meetings.time} className={inputClass} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className={labelClass} htmlFor="meetingPlace">Lieu</label>
            <input id="meetingPlace" name="meetingPlace" defaultValue={site.meetings.place} className={inputClass} />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="flex flex-col gap-1.5">
            <label className={labelClass} htmlFor="facebook">Lien Facebook</label>
            <input id="facebook" name="facebook" type="url" defaultValue={site.contact.facebook} className={inputClass} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className={labelClass} htmlFor="whatsapp">Lien du groupe WhatsApp</label>
            <input id="whatsapp" name="whatsapp" type="url" defaultValue={site.contact.whatsapp} className={inputClass} placeholder="https://chat.whatsapp.com/..." />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className={labelClass} htmlFor="email">E-mail de contact</label>
            <input id="email" name="email" type="email" defaultValue={site.contact.email} className={inputClass} />
          </div>
        </div>

        <div className="flex flex-col gap-1.5 sm:max-w-xs">
          <label className={labelClass} htmlFor="whatsappNumber">
            Numéro WhatsApp pour les adhésions
          </label>
          <input
            id="whatsappNumber"
            name="whatsappNumber"
            defaultValue={site.contact.whatsappNumber}
            className={inputClass}
            placeholder="+225 01 02 03 04 05"
          />
          <p className="text-xs text-ink-400">
            Avec l&apos;indicatif pays. Reçoit le message du formulaire d&apos;adhésion sur la page « Nous rejoindre ».
          </p>
        </div>

        <div>
          <button
            type="submit"
            className="rounded-sm bg-forest-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-forest-500"
          >
            Enregistrer les paramètres
          </button>
        </div>
      </form>
    </div>
  );
}
