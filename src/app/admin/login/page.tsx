import type { Metadata } from "next";
import { hasSupabase } from "@/lib/queries";
import { signIn } from "./actions";

export const metadata: Metadata = { title: "Connexion administration" };

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  if (!hasSupabase) {
    return (
      <div className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center px-5 text-center">
        <h1 className="text-2xl font-bold text-ink-900">Administration non configurée</h1>
        <p className="mt-3 text-ink-600">
          Ajoutez vos identifiants Supabase dans le fichier <code className="rounded bg-sand-100 px-1.5 py-0.5">.env.local</code> à
          la racine du projet pour activer l&apos;espace admin.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-sm flex-col justify-center px-5">
      <p className="text-xs font-bold uppercase tracking-[0.1em] text-forest-500">AJTRA</p>
      <h1 className="mt-1 text-2xl font-bold text-ink-900">Connexion administration</h1>
      <p className="mt-1 text-sm text-ink-600">Réservé au bureau de l&apos;AJTRA.</p>

      <form action={signIn} className="mt-8 flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-semibold text-ink-900">
            E-mail
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="rounded-sm border border-ink-900/15 bg-white px-3 py-2.5 text-sm focus:border-forest-500 focus:outline-none"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="password" className="text-sm font-semibold text-ink-900">
            Mot de passe
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className="rounded-sm border border-ink-900/15 bg-white px-3 py-2.5 text-sm focus:border-forest-500 focus:outline-none"
          />
        </div>

        {error ? <p className="text-sm font-medium text-red-600">{decodeURIComponent(error)}</p> : null}

        <button
          type="submit"
          className="mt-2 rounded-sm bg-forest-600 px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-forest-500"
        >
          Se connecter
        </button>
      </form>
    </div>
  );
}
