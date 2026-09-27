import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { createMemberManually, updateMember, deleteMember } from "./actions";

export const metadata: Metadata = { title: "Membres — Administration" };
export const dynamic = "force-dynamic";

const inputClass =
  "rounded-sm border border-ink-900/15 bg-white px-3 py-2 text-sm focus:border-forest-500 focus:outline-none";
const labelClass = "text-xs font-semibold text-ink-600";
const statuses = ["actif", "inactif", "suspendu"] as const;

type Member = {
  id: string;
  member_no: number;
  full_name: string;
  phone: string;
  email: string | null;
  residence: string | null;
  profession: string | null;
  formation: string | null;
  skills: string | null;
  interest_domain: string | null;
  join_date: string;
  status: string;
  responsibilities: string | null;
  notes: string | null;
};

function memberNumber(n: number) {
  return `AJTRA-${String(n).padStart(4, "0")}`;
}

export default async function AdminMembresPage() {
  const supabase = await createClient();
  const { data } = await supabase.from("members").select("*").order("member_no", { ascending: false });
  const members = (data ?? []) as Member[];

  const total = members.length;
  const actifs = members.filter((m) => m.status === "actif").length;
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);
  const nouveaux = members.filter((m) => new Date(m.join_date) >= startOfMonth).length;

  const domainCounts = new Map<string, number>();
  members.forEach((m) => {
    const d = m.interest_domain?.trim();
    if (d) domainCounts.set(d, (domainCounts.get(d) ?? 0) + 1);
  });
  const topDomains = [...domainCounts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6);

  return (
    <div>
      <h1 className="text-2xl font-bold text-ink-900">Membres</h1>
      <p className="mt-1 text-ink-600">
        Base des membres de l&apos;AJTRA. Les nouvelles demandes se convertissent en membre depuis
        la page « Adhésions ».
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-md border border-ink-900/10 bg-white p-5">
          <p className="text-3xl font-bold text-forest-600">{total}</p>
          <p className="mt-1 text-sm font-semibold text-ink-900">Membres au total</p>
        </div>
        <div className="rounded-md border border-ink-900/10 bg-white p-5">
          <p className="text-3xl font-bold text-forest-600">{actifs}</p>
          <p className="mt-1 text-sm font-semibold text-ink-900">Membres actifs</p>
        </div>
        <div className="rounded-md border border-ink-900/10 bg-white p-5">
          <p className="text-3xl font-bold text-forest-600">{nouveaux}</p>
          <p className="mt-1 text-sm font-semibold text-ink-900">Nouveaux ce mois-ci</p>
        </div>
      </div>

      {topDomains.length ? (
        <div className="mt-4 rounded-md border border-ink-900/10 bg-white p-5">
          <p className="text-sm font-semibold text-ink-900">Membres par domaine d&apos;intérêt</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {topDomains.map(([domain, count]) => (
              <span
                key={domain}
                className="rounded-full bg-forest-100 px-3 py-1 text-xs font-semibold text-forest-700"
              >
                {domain} · {count}
              </span>
            ))}
          </div>
        </div>
      ) : null}

      <section className="mt-8 rounded-md border border-ink-900/10 bg-white p-6">
        <h2 className="font-semibold text-ink-900">Ajouter un membre</h2>
        <form action={createMemberManually} className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col gap-1.5">
            <label className={labelClass} htmlFor="fullName">Nom complet</label>
            <input id="fullName" name="fullName" required className={inputClass} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className={labelClass} htmlFor="phone">Téléphone</label>
            <input id="phone" name="phone" required className={inputClass} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className={labelClass} htmlFor="email">E-mail</label>
            <input id="email" name="email" type="email" className={inputClass} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className={labelClass} htmlFor="residence">Résidence</label>
            <input id="residence" name="residence" className={inputClass} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className={labelClass} htmlFor="profession">Profession</label>
            <input id="profession" name="profession" className={inputClass} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className={labelClass} htmlFor="formation">Formation</label>
            <input id="formation" name="formation" className={inputClass} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className={labelClass} htmlFor="skills">Compétences</label>
            <input id="skills" name="skills" className={inputClass} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className={labelClass} htmlFor="interestDomain">Domaine d&apos;intérêt</label>
            <input id="interestDomain" name="interestDomain" className={inputClass} placeholder="Informatique, santé, droit…" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className={labelClass} htmlFor="joinDate">Date d&apos;adhésion</label>
            <input id="joinDate" name="joinDate" type="date" defaultValue={new Date().toISOString().slice(0, 10)} className={inputClass} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className={labelClass} htmlFor="status">Statut</label>
            <select id="status" name="status" defaultValue="actif" className={inputClass}>
              {statuses.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className={labelClass} htmlFor="responsibilities">Responsabilités</label>
            <input id="responsibilities" name="responsibilities" className={inputClass} />
          </div>
          <div className="flex flex-col gap-1.5 sm:col-span-2 lg:col-span-3">
            <label className={labelClass} htmlFor="notes">Notes</label>
            <textarea id="notes" name="notes" rows={2} className={inputClass} />
          </div>
          <div className="sm:col-span-2 lg:col-span-3">
            <button type="submit" className="rounded-sm bg-forest-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-forest-500">
              Ajouter le membre
            </button>
          </div>
        </form>
      </section>

      <section className="mt-8 flex flex-col gap-3">
        {members.map((m) => (
          <details key={m.id} className="rounded-md border border-ink-900/10 bg-white">
            <summary className="flex cursor-pointer items-center justify-between gap-4 p-5">
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-wide text-bark-700">
                  {memberNumber(m.member_no)} · {m.status}
                </p>
                <p className="truncate font-semibold text-ink-900">{m.full_name}</p>
              </div>
              <span className="flex-none text-sm text-ink-600">{m.phone}</span>
            </summary>

            <div className="border-t border-ink-900/10 p-5">
              <form action={updateMember} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <input type="hidden" name="id" value={m.id} />
                <div className="flex flex-col gap-1.5">
                  <label className={labelClass}>Nom complet</label>
                  <input name="fullName" defaultValue={m.full_name} required className={inputClass} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className={labelClass}>Téléphone</label>
                  <input name="phone" defaultValue={m.phone} required className={inputClass} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className={labelClass}>E-mail</label>
                  <input name="email" type="email" defaultValue={m.email ?? ""} className={inputClass} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className={labelClass}>Résidence</label>
                  <input name="residence" defaultValue={m.residence ?? ""} className={inputClass} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className={labelClass}>Profession</label>
                  <input name="profession" defaultValue={m.profession ?? ""} className={inputClass} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className={labelClass}>Formation</label>
                  <input name="formation" defaultValue={m.formation ?? ""} className={inputClass} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className={labelClass}>Compétences</label>
                  <input name="skills" defaultValue={m.skills ?? ""} className={inputClass} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className={labelClass}>Domaine d&apos;intérêt</label>
                  <input name="interestDomain" defaultValue={m.interest_domain ?? ""} className={inputClass} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className={labelClass}>Date d&apos;adhésion</label>
                  <input name="joinDate" type="date" defaultValue={m.join_date} className={inputClass} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className={labelClass}>Statut</label>
                  <select name="status" defaultValue={m.status} className={inputClass}>
                    {statuses.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className={labelClass}>Responsabilités</label>
                  <input name="responsibilities" defaultValue={m.responsibilities ?? ""} className={inputClass} />
                </div>
                <div className="flex flex-col gap-1.5 sm:col-span-2 lg:col-span-3">
                  <label className={labelClass}>Notes</label>
                  <textarea name="notes" defaultValue={m.notes ?? ""} rows={2} className={inputClass} />
                </div>
                <div className="sm:col-span-2 lg:col-span-3">
                  <button type="submit" className="rounded-sm bg-forest-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-forest-500">
                    Enregistrer
                  </button>
                </div>
              </form>

              <form action={deleteMember} className="mt-3 border-t border-ink-900/10 pt-3">
                <input type="hidden" name="id" value={m.id} />
                <button type="submit" className="text-sm font-semibold text-red-600 hover:underline">
                  Supprimer ce membre
                </button>
              </form>
            </div>
          </details>
        ))}

        {!members.length ? (
          <p className="rounded-md border-2 border-dashed border-ink-900/15 p-8 text-center text-ink-600">
            Aucun membre pour l&apos;instant. Ajoutez-en un ci-dessus, ou convertissez une demande
            d&apos;adhésion depuis la page « Adhésions ».
          </p>
        ) : null}
      </section>
    </div>
  );
}
