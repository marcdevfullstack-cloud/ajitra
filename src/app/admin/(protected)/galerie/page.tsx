import type { Metadata } from "next";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { addPhoto, deletePhoto } from "./actions";

export const metadata: Metadata = { title: "Galerie — Administration" };
export const dynamic = "force-dynamic";

const inputClass =
  "rounded-sm border border-ink-900/15 bg-white px-3 py-2 text-sm focus:border-forest-500 focus:outline-none";
const labelClass = "text-xs font-semibold text-ink-600";

type Photo = { id: string; url: string; caption: string };

export default async function AdminGaleriePage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("gallery_photos")
    .select("*")
    .order("created_at", { ascending: false });
  const photos = (data ?? []) as Photo[];

  return (
    <div>
      <h1 className="text-2xl font-bold text-ink-900">Galerie</h1>
      <p className="mt-1 text-ink-600">Photos affichées sur la page « Galerie » du site.</p>

      <section className="mt-8 rounded-md border border-ink-900/10 bg-white p-6">
        <h2 className="font-semibold text-ink-900">Ajouter une photo</h2>
        <form action={addPhoto} className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label className={labelClass} htmlFor="image">Image</label>
            <input id="image" name="image" type="file" accept="image/*" required className={inputClass} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className={labelClass} htmlFor="caption">Légende</label>
            <input id="caption" name="caption" className={inputClass} placeholder="Sortie détente à Grand-Bassam" />
          </div>
          <div className="sm:col-span-2">
            <button
              type="submit"
              className="rounded-sm bg-forest-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-forest-500"
            >
              Ajouter la photo
            </button>
          </div>
        </form>
      </section>

      <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {photos.map((photo) => (
          <div key={photo.id} className="overflow-hidden rounded-md border border-ink-900/10 bg-white">
            <div className="relative aspect-[4/3]">
              <Image src={photo.url} alt={photo.caption || "Photo AJTRA"} fill className="object-cover" />
            </div>
            <div className="p-4">
              <p className="truncate text-sm text-ink-600">{photo.caption || "Sans légende"}</p>
              <form action={deletePhoto} className="mt-2">
                <input type="hidden" name="id" value={photo.id} />
                <button type="submit" className="text-sm font-semibold text-red-600 hover:underline">
                  Supprimer
                </button>
              </form>
            </div>
          </div>
        ))}
      </section>

      {!photos.length ? (
        <p className="mt-8 rounded-md border-2 border-dashed border-ink-900/15 p-8 text-center text-ink-600">
          Aucune photo pour l&apos;instant.
        </p>
      ) : null}
    </div>
  );
}
