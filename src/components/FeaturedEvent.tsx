import Image from "next/image";
import Container from "@/components/Container";
import Button from "@/components/Button";
import Reveal from "@/components/Reveal";
import WeavePattern from "@/components/WeavePattern";
import type { Event } from "@/lib/data";

export default function FeaturedEvent({ event }: { event: Event }) {
  const meta = [event.time, event.place].filter(Boolean);

  return (
    <section className="relative overflow-hidden bg-forest-800 py-16 text-white sm:py-20">
      <WeavePattern className="text-white/[0.04]" />
      <Container className="relative grid items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <Reveal>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-gold-400">
            À ne pas manquer
          </p>
          <p className="mt-4 font-display text-lg font-semibold text-forest-100/90">
            {event.dateLabel}
          </p>
          <h2 className="mt-2 text-balance font-display text-3xl font-bold leading-tight sm:text-4xl">
            {event.title}
          </h2>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-sm text-forest-100/80">
            {meta.map((m) => (
              <span key={m}>{m}</span>
            ))}
          </div>
          <p className="mt-5 max-w-md text-forest-100/85">{event.description}</p>
          <div className="mt-8">
            <Button href="/evenements" className="!bg-white !text-forest-800 hover:!bg-sand-100">
              Tous les événements
            </Button>
          </div>
        </Reveal>

        <Reveal delay={150} className="relative">
          <div className="relative mx-auto aspect-[3/4] max-w-sm overflow-hidden rounded-md shadow-2xl ring-1 ring-white/10 sm:max-w-md">
            <Image
              src={event.image}
              alt={event.title}
              fill
              sizes="(min-width: 1024px) 480px, 90vw"
              className="object-cover"
              priority
            />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
