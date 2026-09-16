import WeavePattern from "@/components/WeavePattern";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";

export default function Manifesto({
  brong,
  fr,
}: {
  brong: string;
  fr: string;
}) {
  return (
    <section className="relative overflow-hidden bg-forest-900 py-24 text-white sm:py-32">
      <WeavePattern className="text-white/[0.05]" />
      <Container className="relative">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold-400">
            Notre devise
          </p>
          <p className="mt-6 text-balance font-display text-3xl italic leading-tight sm:text-5xl">
            « {brong} »
          </p>
          <div className="mx-auto mt-8 h-px w-16 bg-gold-500" />
          <p className="mt-8 text-lg text-forest-100/85 sm:text-xl">{fr}</p>
        </Reveal>
      </Container>
    </section>
  );
}
