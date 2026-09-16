import type { Metadata } from "next";
import Container from "@/components/Container";
import SectionHeader from "@/components/SectionHeader";
import InfoStrip from "@/components/InfoStrip";
import BureauCard from "@/components/BureauCard";
import Reveal from "@/components/Reveal";
import { getSiteSettings, getBureau } from "@/lib/queries";

export const metadata: Metadata = { title: "Qui sommes-nous" };
export const revalidate = 30;

export default async function AProposPage() {
  const [site, bureau] = await Promise.all([getSiteSettings(), getBureau()]);

  return (
    <>
      <section className="py-16 sm:py-20">
        <Container>
          <Reveal>
            <SectionHeader eyebrow="Qui sommes-nous" title="Notre histoire, notre mission" />
            <div className="mt-8 max-w-2xl space-y-4 text-ink-600">
              {site.mission.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={100} className="mt-10 max-w-xl rounded-r-md border-l-[3px] border-gold-500 bg-white px-6 py-5 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-[0.1em] text-bark-700">
              Notre slogan, en langue brong
            </p>
            <p className="mt-2 font-display text-xl italic text-forest-700">
              « {site.slogan.brong} »
            </p>
            <p className="mt-2 text-ink-600">{site.slogan.fr}</p>
          </Reveal>

          <Reveal delay={150} className="mt-12">
            <InfoStrip meetings={site.meetings} />
          </Reveal>
        </Container>
      </section>

      <section className="bg-sand-100 py-16 sm:py-20">
        <Container>
          <Reveal>
            <SectionHeader eyebrow="Le comité" title="Le bureau de l'AJTRA" />
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {bureau.map((m, i) => (
              <Reveal key={`${m.role}-${i}`} delay={i * 60}>
                <BureauCard member={m} />
              </Reveal>
            ))}
          </div>
          <p className="mt-6 text-sm italic text-ink-400">
            Composition du bureau à confirmer prochainement.
          </p>
        </Container>
      </section>
    </>
  );
}
