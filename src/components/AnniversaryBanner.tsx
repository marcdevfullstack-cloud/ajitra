import Container from "@/components/Container";
import Reveal from "@/components/Reveal";

export default function AnniversaryBanner() {
  return (
    <section className="py-20 sm:py-28">
      <Container className="flex flex-col items-center gap-6 text-center sm:flex-row sm:items-end sm:justify-center sm:gap-10 sm:text-left">
        <Reveal>
          <span className="font-display text-[6rem] font-black leading-none text-forest-600 sm:text-[9rem]">
            25
          </span>
        </Reveal>
        <Reveal delay={150} className="max-w-sm sm:pb-4">
          <p className="font-display text-2xl font-semibold leading-snug text-ink-900 sm:text-3xl">
            ans d&apos;unité et de solidarité pour Transua
          </p>
          <p className="mt-2 text-ink-600">
            Depuis sa création, l&apos;AJTRA rassemble les jeunes du village autour d&apos;un même
            engagement fraternel.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
