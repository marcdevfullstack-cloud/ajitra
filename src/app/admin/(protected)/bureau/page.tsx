import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { createMember, updateMember, deleteMember } from "./actions";

export const metadata: Metadata = { title: "Bureau — Administration" };
export const dynamic = "force-dynamic";

const inputClass =
  "rounded-sm border border-ink-900/15 bg-white px-3 py-2 text-sm focus:border-forest-500 focus:outline-none";
const labelClass = "text-xs font-semibold text-ink-600";

type Member = { id: string; role: string; name: string; sort_order: number };

export default async function AdminBureauPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("bureau_members")
    .select("*")
    .order("sort_order", { ascending: true });
  const members = (data ?? []) as Member[];

  return (
    <div>
      <h1 className="text-2xl font-bold text-ink-900">Bureau</h1>
      <p className="mt-1 text-ink-600">Composition du comité affichée sur la page « Qui sommes-nous ».</p>

      <section className="mt-8 rounded-md border border-ink-900/10 bg-white p-6">
        <h2 className="font-semibold text-ink-900">Ajouter un membre</h2>
        <form action={createMember} className="mt-4 grid gap-4 sm:grid-cols-3">
          <div className="flex flex-col gap-1.5">
            <label className={labelClass} htmlFor="role">Rôle</label>
            <input id="role" name="role" required className={inputClass} placeholder="Président(e)" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className={labelClass} htmlFor="name">Nom</label>
            <input id="name" name="name" required className={inputClass} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className={labelClass} htmlFor="sortOrder">Ordre d&apos;affichage</label>
            <input id="sortOrder" name="sortOrder" type="number" defaultValue={members.length + 1} className={inputClass} />
          </div>
          <div className="sm:col-span-3">
            <button
              type="submit"
              className="rounded-sm bg-forest-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-forest-500"
            >
              Ajouter
            </button>
          </div>
        </form>
      </section>

      <section className="mt-8 flex flex-col gap-3">
        {members.map((member) => (
          <form
            key={member.id}
            action={updateMember}
            className="grid gap-3 rounded-md border border-ink-900/10 bg-white p-4 sm:grid-cols-[1fr_1fr_100px_auto_auto] sm:items-end"
          >
            <input type="hidden" name="id" value={member.id} />
            <div className="flex flex-col gap-1.5">
              <label className={labelClass}>Rôle</label>
              <input name="role" defaultValue={member.role} required className={inputClass} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className={labelClass}>Nom</label>
              <input name="name" defaultValue={member.name} required className={inputClass} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className={labelClass}>Ordre</label>
              <input name="sortOrder" type="number" defaultValue={member.sort_order} className={inputClass} />
            </div>
            <button
              type="submit"
              className="rounded-sm border border-forest-600 px-4 py-2 text-sm font-bold text-forest-600 hover:bg-forest-100"
            >
              Enregistrer
            </button>
            <button
              type="submit"
              formAction={deleteMember}
              className="rounded-sm px-4 py-2 text-sm font-semibold text-red-600 hover:underline"
            >
              Supprimer
            </button>
          </form>
        ))}

        {!members.length ? (
          <p className="rounded-md border-2 border-dashed border-ink-900/15 p-8 text-center text-ink-600">
            Aucun membre pour l&apos;instant.
          </p>
        ) : null}
      </section>
    </div>
  );
}
