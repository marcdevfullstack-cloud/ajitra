import type { Metadata } from "next";
import Container from "@/components/Container";
import SectionHeader from "@/components/SectionHeader";
import EventCard from "@/components/EventCard";
import Reveal from "@/components/Reveal";
import { getEvents } from "@/lib/queries";

export const metadata: Metadata = { title: "Événements" };
export const revalidate = 30;

export default async function EvenementsPage() {
  const events = await getEvents();
  const sorted = [...events].sort((a, b) => a.isoDate.localeCompare(b.isoDate));

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <Reveal>
          <SectionHeader
            eyebrow="Vie associative"
            title="Événements & actualités"
            lead="Retrouvez ici les rencontres, conférences et sorties organisées par l'AJTRA."
          />
        </Reveal>
        <div className="mt-12 flex flex-col gap-8">
          {sorted.length ? (
            sorted.map((event, i) => (
              <Reveal key={event.id} delay={i * 80}>
                <EventCard event={event} priority={i === 0} reverse={i % 2 === 1} />
              </Reveal>
            ))
          ) : (
            <div className="rounded-md border-2 border-dashed border-ink-900/15 px-8 py-14 text-center text-ink-600">
              Aucun événement annoncé pour l&apos;instant.
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
