"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { site } from "@/lib/data";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/a-propos", label: "Qui sommes-nous" },
  { href: "/evenements", label: "Événements" },
  { href: "/galerie", label: "Galerie" },
  { href: "/rejoindre", label: "Nous rejoindre" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-ink-900/10 bg-sand-50/90 backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <Image
            src="/images/logo.jpg"
            alt="Logo AJTRA"
            width={38}
            height={38}
            className="rounded-full object-cover"
            priority
          />
          <span className="font-display text-lg font-bold text-forest-700">
            {site.name}
          </span>
        </Link>

        <nav className="hidden gap-1 md:flex">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-sm px-3 py-2 text-sm font-semibold transition-colors ${
                  active
                    ? "text-forest-600"
                    : "text-ink-600 hover:bg-forest-100 hover:text-forest-600"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Ouvrir le menu"
          className="inline-flex items-center justify-center rounded-sm border border-ink-900/15 p-2 md:hidden"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {open ? (
        <nav className="flex flex-col border-t border-ink-900/10 bg-sand-50 px-5 pb-3 md:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="border-b border-ink-900/10 py-3 text-sm font-semibold text-ink-900 last:border-none"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      ) : null}
    </header>
  );
}
