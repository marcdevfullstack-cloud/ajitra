import type { Metadata } from "next";
import Container from "@/components/Container";
import SectionHeader from "@/components/SectionHeader";
import Reveal from "@/components/Reveal";
import { getSiteSettings } from "@/lib/queries";

export const metadata: Metadata = { title: "Contact" };
export const revalidate = 30;

export default async function ContactPage() {
  const site = await getSiteSettings();

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <Reveal>
          <SectionHeader eyebrow="Contact" title="Restons en lien" />
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <a
            href={site.contact.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-ink-900/10 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
          >
            <p className="text-xs font-bold uppercase tracking-[0.1em] text-forest-500">
              Facebook
            </p>
            <p className="mt-1.5 font-display text-lg font-semibold text-ink-900">
              amicale.ajtra
            </p>
          </a>

          <div className="rounded-md border border-ink-900/10 bg-white p-6 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-[0.1em] text-forest-500">
              Réunions
            </p>
            <p className="mt-1.5 font-display text-lg font-semibold text-ink-900">
              {site.meetings.frequency}
            </p>
            <p className="mt-1 text-sm text-ink-600">
              {site.meetings.time} — {site.meetings.place}
            </p>
          </div>

          {site.contact.whatsapp ? (
            <a
              href={site.contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border border-ink-900/10 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            >
              <p className="text-xs font-bold uppercase tracking-[0.1em] text-forest-500">
                WhatsApp
              </p>
              <p className="mt-1.5 font-display text-lg font-semibold text-ink-900">
                Rejoindre le groupe
              </p>
            </a>
          ) : (
            <div className="rounded-md border border-ink-900/10 bg-white p-6 shadow-sm opacity-70">
              <p className="text-xs font-bold uppercase tracking-[0.1em] text-forest-500">
                WhatsApp
              </p>
              <p className="mt-1.5 font-display text-lg font-semibold text-ink-900">
                Lien à venir
              </p>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
