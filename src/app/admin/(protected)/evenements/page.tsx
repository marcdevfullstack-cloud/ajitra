import type { Metadata } from "next";
import Image from "next/image";
import { getEvents } from "@/lib/queries";
import { createEvent, updateEvent, deleteEvent } from "./actions";

export const metadata: Metadata = { title: "Événements — Administration" };
export const dynamic = "force-dynamic";

const inputClass =
  "rounded-sm border border-ink-900/15 bg-white px-3 py-2 text-sm focus:border-forest-500 focus:outline-none";
const labelClass = "text-xs font-semibold text-ink-600";

export default async function AdminEvenementsPage() {
  const events = [...(await getEvents())].sort((a, b) => a.isoDate.localeCompare(b.isoDate));

  return (
    <div>
      <h1 className="text-2xl font-bold text-ink-900">Événements</h1>
      <p className="mt-1 text-ink-600">Ajoutez, modifiez ou retirez les événements affichés sur le site.</p>

      <section className="mt-8 rounded-md border border-ink-900/10 bg-white p-6">
        <h2 className="font-semibold text-ink-900">Ajouter un événement</h2>
        <form action={createEvent} className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <label className={labelClass} htmlFor="title">Titre</label>
            <input id="title" name="title" required className={inputClass} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className={labelClass} htmlFor="dateLabel">Date affichée (ex : Dimanche 12 juillet 2026)</label>
            <input id="dateLabel" name="dateLabel" required className={inputClass} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className={labelClass} htmlFor="isoDate">Date (pour le tri)</label>
            <input id="isoDate" name="isoDate" type="date" required className={inputClass} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className={labelClass} htmlFor="time">Heure</label>
            <input id="time" name="time" className={inputClass} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className={labelClass} htmlFor="place">Lieu</label>
            <input id="place" name="place" required className={inputClass} />
          </div>
          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <label className={labelClass} htmlFor="description">Description</label>
            <textarea id="description" name="description" rows={3} required className={inputClass} />
          </div>
          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <label className={labelClass} htmlFor="image">Image (affiche / photo)</label>
            <input id="image" name="image" type="file" accept="image/*" className={inputClass} />
          </div>
          <div className="sm:col-span-2">
            <button
              type="submit"
              className="rounded-sm bg-forest-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-forest-500"
            >
              Ajouter l&apos;événement
            </button>
          </div>
        </form>
      </section>

      <section className="mt-8 flex flex-col gap-5">
        {events.map((event) => (
          <details key={event.id} className="rounded-md border border-ink-900/10 bg-white">
            <summary className="flex cursor-pointer items-center gap-4 p-5">
              <Image
                src={event.image}
                alt={event.title}
                width={64}
                height={64}
                className="h-16 w-16 flex-none rounded object-cover"
              />
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-wide text-bark-700">{event.dateLabel}</p>
                <p className="truncate font-semibold text-ink-900">{event.title}</p>
              </div>
            </summary>

            <div className="border-t border-ink-900/10 p-5">
              <form action={updateEvent} className="grid gap-4 sm:grid-cols-2">
                <input type="hidden" name="id" value={event.id} />
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label className={labelClass}>Titre</label>
                  <input name="title" defaultValue={event.title} required className={inputClass} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className={labelClass}>Date affichée</label>
                  <input name="dateLabel" defaultValue={event.dateLabel} required className={inputClass} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className={labelClass}>Date (pour le tri)</label>
                  <input name="isoDate" type="date" defaultValue={event.isoDate} required className={inputClass} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className={labelClass}>Heure</label>
                  <input name="time" defaultValue={event.time} className={inputClass} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className={labelClass}>Lieu</label>
                  <input name="place" defaultValue={event.place} required className={inputClass} />
                </div>
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label className={labelClass}>Description</label>
                  <textarea name="description" defaultValue={event.description} rows={3} required className={inputClass} />
                </div>
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label className={labelClass}>Remplacer l&apos;image</label>
                  <input name="image" type="file" accept="image/*" className={inputClass} />
                </div>
                <div className="flex gap-3 sm:col-span-2">
                  <button
                    type="submit"
                    className="rounded-sm bg-forest-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-forest-500"
                  >
                    Enregistrer
                  </button>
                </div>
              </form>

              <form action={deleteEvent} className="mt-3 border-t border-ink-900/10 pt-3">
                <input type="hidden" name="id" value={event.id} />
                <button type="submit" className="text-sm font-semibold text-red-600 hover:underline">
                  Supprimer cet événement
                </button>
              </form>
            </div>
          </details>
        ))}

        {!events.length ? (
          <p className="rounded-md border-2 border-dashed border-ink-900/15 p-8 text-center text-ink-600">
            Aucun événement pour l&apos;instant.
          </p>
        ) : null}
      </section>
    </div>
  );
}
