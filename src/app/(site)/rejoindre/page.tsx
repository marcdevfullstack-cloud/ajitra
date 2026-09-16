import type { Metadata } from "next";
import Container from "@/components/Container";
import SectionHeader from "@/components/SectionHeader";
import Button from "@/components/Button";
import AdhesionForm from "@/components/AdhesionForm";
import Reveal from "@/components/Reveal";
import { getSiteSettings } from "@/lib/queries";

export const metadata: Metadata = { title: "Nous rejoindre" };
export const revalidate = 30;

export default async function RejoindrePage() {
  const site = await getSiteSettings();

  const steps = [
    {
      title: "Remplissez le formulaire d'adhésion",
      text: "Vos informations sont transmises directement au bureau de l'AJTRA, ci-dessous.",
    },
    {
      title: "Assistez à une réunion",
      text: `${site.meetings.frequency}, à ${site.meetings.time}, ${site.meetings.place}.`,
    },
    {
      title: "Rejoignez le groupe WhatsApp",
      text: site.contact.whatsapp
        ? "Suivez nos échanges au quotidien."
        : "Suivez nos échanges au quotidien (lien à venir prochainement).",
    },
  ];

  return (
    <>
      <section className="py-16 sm:py-20">
        <Container className="grid gap-12 md:grid-cols-[1.1fr_0.9fr] md:items-start">
          <Reveal>
            <SectionHeader eyebrow="Nous rejoindre" title="Devenez membre de l'AJTRA" />
            <p className="mt-5 max-w-xl text-ink-600">{site.callToJoin}</p>

            <ol className="mt-8 flex flex-col gap-6">
              {steps.map((step, i) => (
                <li key={step.title} className="flex gap-4">
                  <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-forest-600 text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-display text-lg font-semibold text-ink-900">
                      {step.title}
                    </p>
                    <p className="mt-0.5 text-ink-600">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal delay={100} className="rounded-md border border-ink-900/10 bg-white p-7 shadow-sm">
            <h3 className="text-lg font-bold text-ink-900">Nous contacter</h3>
            <div className="mt-4 flex flex-col gap-3">
              <Button href={site.contact.facebook} external>
                Page Facebook
              </Button>
              {site.contact.whatsapp ? (
                <Button href={site.contact.whatsapp} external variant="ghost">
                  Groupe WhatsApp
                </Button>
              ) : (
                <Button variant="ghost" disabled>
                  Groupe WhatsApp — lien à venir
                </Button>
              )}
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="bg-sand-100 py-16 sm:py-20">
        <Container>
          <Reveal className="mx-auto max-w-2xl rounded-md border border-ink-900/10 bg-white p-7 shadow-sm sm:p-9">
            <SectionHeader
              eyebrow="Formulaire d'adhésion"
              title="Faire une demande d'adhésion"
              lead="Vos coordonnées seront transmises au bureau de l'AJTRA, sur WhatsApp."
            />
            <div className="mt-8">
              <AdhesionForm whatsappNumber={site.contact.whatsappNumber} />
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
