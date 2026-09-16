import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getBureau, getEvents, getGallery } from "@/lib/queries";

export const metadata: Metadata = { title: "Tableau de bord" };
export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const supabase = await createClient();
  const [events, bureau, gallery, adhesionsCount] = await Promise.all([
    getEvents(),
    getBureau(),
    getGallery(),
    supabase.from("adhesions").select("id", { count: "exact", head: true }),
  ]);

  const cards = [
    { href: "/admin/adhesions", label: "Demandes d'adhésion", count: adhesionsCount.count ?? 0 },
    { href: "/admin/evenements", label: "Événements", count: events.length },
    { href: "/admin/bureau", label: "Membres du bureau", count: bureau.length },
    { href: "/admin/galerie", label: "Photos en galerie", count: gallery.length },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-ink-900">Tableau de bord</h1>
      <p className="mt-1 text-ink-600">Gérez le contenu du site AJTRA.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="rounded-md border border-ink-900/10 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <p className="text-3xl font-bold text-forest-600">{card.count}</p>
            <p className="mt-1 text-sm font-semibold text-ink-900">{card.label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-10 rounded-md border border-ink-900/10 bg-white p-6">
        <h2 className="font-semibold text-ink-900">Paramètres généraux</h2>
        <p className="mt-1 text-sm text-ink-600">
          Mission, slogan, réunions et liens de contact (Facebook, WhatsApp).
        </p>
        <Link
          href="/admin/parametres"
          className="mt-3 inline-block text-sm font-bold text-forest-600 hover:underline"
        >
          Modifier les paramètres →
        </Link>
      </div>
    </div>
  );
}
