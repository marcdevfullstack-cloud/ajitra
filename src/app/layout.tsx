import type { Metadata } from "next";
import { Fraunces, Karla } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/data";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const karla = Karla({
  variable: "--font-karla",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} — ${site.fullName}`,
    template: `%s — ${site.name}`,
  },
  description: site.tagline,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${fraunces.variable} ${karla.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-sand-50 text-ink-900">{children}</body>
    </html>
  );
}
