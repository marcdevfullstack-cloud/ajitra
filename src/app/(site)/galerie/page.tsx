import type { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/Container";
import SectionHeader from "@/components/SectionHeader";
import Reveal from "@/components/Reveal";
import { getGallery } from "@/lib/queries";

export const metadata: Metadata = { title: "Galerie" };
export const revalidate = 30;

export default async function GaleriePage() {
  const gallery = await getGallery();

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <Reveal>
          <SectionHeader
            eyebrow="En images"
            title="Galerie photos"
            lead="Les temps forts de la vie de l'amicale."
          />
        </Reveal>
        {gallery.length ? (
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {gallery.map((photo, i) => (
              <Reveal key={photo.src} delay={(i % 8) * 50}>
                <div className="group relative aspect-[4/3] overflow-hidden rounded-md border border-ink-900/10 bg-sand-200">
                  <Image
                    src={photo.src}
                    alt={photo.caption}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal delay={100} className="mt-10 rounded-md border-2 border-dashed border-ink-900/15 px-8 py-14 text-center text-ink-600">
            Bientôt des photos de nos activités — revenez nous voir !
          </Reveal>
        )}
      </Container>
    </section>
  );
}
