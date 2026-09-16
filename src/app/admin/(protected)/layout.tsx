import Image from "next/image";
import Link from "next/link";
import { signOut } from "./actions";

const links = [
  { href: "/admin", label: "Tableau de bord" },
  { href: "/admin/adhesions", label: "Adhésions" },
  { href: "/admin/evenements", label: "Événements" },
  { href: "/admin/bureau", label: "Bureau" },
  { href: "/admin/galerie", label: "Galerie" },
  { href: "/admin/parametres", label: "Paramètres" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <aside className="flex flex-col gap-1 border-b border-ink-900/10 bg-forest-900 px-4 py-4 text-forest-100 md:w-60 md:flex-none md:border-b-0 md:border-r md:px-3 md:py-6">
        <div className="mb-4 flex items-center gap-2 px-2">
          <Image
            src="/images/logo.jpg"
            alt="Logo AJTRA"
            width={28}
            height={28}
            className="rounded-full object-cover"
          />
          <span className="font-display text-base font-bold text-white">Administration</span>
        </div>

        <nav className="flex flex-row gap-1 overflow-x-auto md:flex-col">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="whitespace-nowrap rounded-sm px-3 py-2 text-sm font-semibold text-forest-100/85 transition-colors hover:bg-white/10 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="mt-auto hidden pt-4 md:block">
          <Link href="/" className="block rounded-sm px-3 py-2 text-sm text-forest-100/70 hover:text-white">
            ← Retour au site
          </Link>
          <form action={signOut}>
            <button
              type="submit"
              className="mt-1 w-full rounded-sm px-3 py-2 text-left text-sm font-semibold text-forest-100/85 hover:bg-white/10 hover:text-white"
            >
              Se déconnecter
            </button>
          </form>
        </div>
      </aside>

      <main className="flex-1 bg-sand-50 px-5 py-8 sm:px-8">{children}</main>
    </div>
  );
}
