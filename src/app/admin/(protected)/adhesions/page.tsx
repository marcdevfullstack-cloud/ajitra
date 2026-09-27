import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { deleteAdhesion } from "./actions";
import { convertAdhesionToMember } from "../membres/actions";

export const metadata: Metadata = { title: "Adhésions — Administration" };
export const dynamic = "force-dynamic";

type Adhesion = {
  id: string;
  full_name: string;
  phone: string;
  email: string | null;
  residence: string | null;
  relation: string | null;
  message: string | null;
  status: string;
  created_at: string;
};

export default async function AdminAdhesionsPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("adhesions")
    .select("*")
    .order("created_at", { ascending: false });
  const adhesions = (data ?? []) as Adhesion[];

  return (
    <div>
      <h1 className="text-2xl font-bold text-ink-900">Adhésions</h1>
      <p className="mt-1 text-ink-600">Demandes envoyées depuis le formulaire de la page « Nous rejoindre ».</p>

      <section className="mt-8 flex flex-col gap-4">
        {adhesions.map((a) => (
          <div key={a.id} className="rounded-md border border-ink-900/10 bg-white p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-display text-lg font-semibold text-ink-900">{a.full_name}</p>
                  {a.status === "converti" ? (
                    <span className="rounded-full bg-forest-100 px-2.5 py-0.5 text-xs font-semibold text-forest-700">
                      Membre
                    </span>
                  ) : (
                    <span className="rounded-full bg-gold-400/20 px-2.5 py-0.5 text-xs font-semibold text-bark-700">
                      Nouveau
                    </span>
                  )}
                </div>
                <p className="text-sm text-ink-600">
                  {new Date(a.created_at).toLocaleString("fr-FR", {
                    dateStyle: "long",
                    timeStyle: "short",
                  })}
                </p>
              </div>
              <div className="flex flex-none gap-3">
                {a.status !== "converti" ? (
                  <form action={convertAdhesionToMember}>
                    <input type="hidden" name="adhesionId" value={a.id} />
                    <input type="hidden" name="fullName" value={a.full_name} />
                    <input type="hidden" name="phone" value={a.phone} />
                    <input type="hidden" name="email" value={a.email ?? ""} />
                    <input type="hidden" name="residence" value={a.residence ?? ""} />
                    <button
                      type="submit"
                      className="rounded-sm border border-forest-600 px-3 py-1.5 text-sm font-bold text-forest-600 hover:bg-forest-100"
                    >
                      Convertir en membre
                    </button>
                  </form>
                ) : null}
                <form action={deleteAdhesion}>
                  <input type="hidden" name="id" value={a.id} />
                  <button type="submit" className="text-sm font-semibold text-red-600 hover:underline">
                    Supprimer
                  </button>
                </form>
              </div>
            </div>

            <dl className="mt-4 grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
              <div>
                <dt className="font-semibold text-ink-600">Téléphone</dt>
                <dd>
                  <a href={`tel:${a.phone}`} className="text-forest-600 hover:underline">
                    {a.phone}
                  </a>
                </dd>
              </div>
              {a.email ? (
                <div>
                  <dt className="font-semibold text-ink-600">E-mail</dt>
                  <dd>
                    <a href={`mailto:${a.email}`} className="text-forest-600 hover:underline">
                      {a.email}
                    </a>
                  </dd>
                </div>
              ) : null}
              {a.residence ? (
                <div>
                  <dt className="font-semibold text-ink-600">Résidence</dt>
                  <dd>{a.residence}</dd>
                </div>
              ) : null}
              {a.relation ? (
                <div>
                  <dt className="font-semibold text-ink-600">Lien avec Transua</dt>
                  <dd>{a.relation}</dd>
                </div>
              ) : null}
            </dl>

            {a.message ? (
              <p className="mt-3 rounded-sm bg-sand-100 p-3 text-sm text-ink-600">{a.message}</p>
            ) : null}
          </div>
        ))}

        {!adhesions.length ? (
          <p className="rounded-md border-2 border-dashed border-ink-900/15 p-8 text-center text-ink-600">
            Aucune demande d&apos;adhésion pour l&apos;instant.
          </p>
        ) : null}
      </section>
    </div>
  );
}
