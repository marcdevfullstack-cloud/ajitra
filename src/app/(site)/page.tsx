import Image from "next/image";
import Container from "@/components/Container";
import Button from "@/components/Button";
import BarkDivider from "@/components/BarkDivider";
import SectionHeader from "@/components/SectionHeader";
import InfoStrip from "@/components/InfoStrip";
import Reveal from "@/components/Reveal";
import Manifesto from "@/components/Manifesto";
import AnniversaryBanner from "@/components/AnniversaryBanner";
import EventMiniCard from "@/components/EventMiniCard";
import { site as siteConstants } from "@/lib/data";
import { getSiteSettings, getEvents } from "@/lib/queries";

export const revalidate = 30;

export default async function Home() {
  const [site, events] = await Promise.all([getSiteSettings(), getEvents()]);
  const upcomingEvents = [...events].sort((a, b) => a.isoDate.localeCompare(b.isoDate)).slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-white to-forest-100">
        <Container className="grid items-center gap-10 pt-16 pb-10 sm:pt-24 md:grid-cols-[auto_1fr]">
          <Image
            src="/images/logo.jpg"
            alt="Logo de l'AJTRA"
            width={148}
            height={148}
            priority
            className="justify-self-start rounded-full border-4 border-white object-cover shadow-md md:justify-self-auto"
          />
          <div>
            <p className="text-sm font-semibold text-forest-600">{siteConstants.fullName}</p>
            <h1 className="mt-3 text-balance text-[clamp(2.25rem,5.5vw,4.25rem)] font-extrabold leading-[1.02] text-ink-900">
              Unis pour la jeunesse et le développement de Transua
            </h1>
            <p className="mt-5 max-w-xl text-lg text-ink-600">{site.tagline}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/rejoindre">Rejoindre l&apos;AJTRA</Button>
              <Button href={site.contact.facebook} external variant="ghost">
                Notre page Facebook
              </Button>
            </div>
          </div>
        </Container>
        <div className="text-ink-900">
          <BarkDivider animated />
        </div>
      </section>

      {/* Info strip */}
      <section className="py-12">
        <Container>
          <Reveal>
            <InfoStrip meetings={site.meetings} />
          </Reveal>
        </Container>
      </section>

      <AnniversaryBanner />

      <Manifesto brong={site.slogan.brong} fr={site.slogan.fr} />

      {/* Mission teaser */}
      <section className="bg-sand-100 py-16 sm:py-20">
        <Container className="grid gap-10 md:grid-cols-2 md:items-start">
          <Reveal>
            <SectionHeader
              eyebrow="Qui sommes-nous"
              title="Une amicale, un seul village, une même force"
            />
          </Reveal>
          <Reveal delay={100} className="space-y-4 text-ink-600">
            {site.mission.slice(0, 2).map((p) => (
              <p key={p}>{p}</p>
            ))}
            <Button href="/a-propos" variant="ghost">
              En savoir plus →
            </Button>
          </Reveal>
        </Container>
      </section>

      {/* Événements */}
      {upcomingEvents.length ? (
        <section className="py-16 sm:py-20">
          <Container>
            <Reveal>
              <SectionHeader
                eyebrow="Vie associative"
                title="Nos prochains événements"
                align="center"
              />
            </Reveal>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {upcomingEvents.map((event, i) => (
                <Reveal key={event.id} delay={i * 100}>
                  <EventMiniCard event={event} />
                </Reveal>
              ))}
            </div>
            <Reveal delay={200} className="mt-10 flex justify-center">
              <Button href="/evenements" variant="ghost">
                Tous les événements
              </Button>
            </Reveal>
          </Container>
        </section>
      ) : null}

      {/* Join banner */}
      <section className="bg-forest-700 py-16 text-white sm:py-20">
        <Container className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <Reveal>
            <h2 className="text-balance text-2xl font-bold sm:text-3xl">
              Ressortissant(e) de Transua ? Rejoignez-nous.
            </h2>
            <p className="mt-2 max-w-xl text-forest-100/90">{site.callToJoin}</p>
          </Reveal>
          <Reveal delay={100}>
            <Button href="/rejoindre" className="!bg-white !text-forest-700 hover:!bg-sand-50">
              Comment nous rejoindre
            </Button>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
