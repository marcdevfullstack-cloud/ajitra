import Image from "next/image";
import Link from "next/link";
import { getSiteSettings } from "@/lib/queries";

export default async function Footer() {
  const site = await getSiteSettings();

  return (
    <footer className="mt-auto bg-forest-900 text-forest-100">
      <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <div className="flex items-center gap-2.5">
              <Image
                src="/images/logo.jpg"
                alt="Logo AJTRA"
                width={34}
                height={34}
                className="rounded-full object-cover"
              />
              <span className="font-display text-lg font-bold">{site.name}</span>
            </div>
            <p className="mt-3 max-w-xs text-sm text-forest-100/80">{site.fullName}</p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.1em] text-forest-400">
              Réunions
            </h4>
            <p className="mt-3 text-sm text-forest-100/85">{site.meetings.frequency}</p>
            <p className="text-sm text-forest-100/85">
              {site.meetings.time} — {site.meetings.place}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.1em] text-forest-400">
              Liens
            </h4>
            <div className="mt-3 flex flex-col gap-2 text-sm">
              <a
                href={site.contact.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-forest-100/85 hover:text-white hover:underline"
              >
                Facebook
              </a>
              <Link href="/rejoindre" className="text-forest-100/85 hover:text-white hover:underline">
                Nous rejoindre
              </Link>
              <Link href="/contact" className="text-forest-100/85 hover:text-white hover:underline">
                Contact
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-forest-100/60 sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} {site.name} — {site.fullName}</span>
          <span>{site.slogan.brong}</span>
        </div>
      </div>
    </footer>
  );
}
