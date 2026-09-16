import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Client public en lecture seule, sans dépendance aux cookies.
 * Permet aux pages publiques de rester statiques (avec revalidation),
 * au lieu de basculer en rendu dynamique à chaque requête.
 * N'utiliser que pour des lectures publiques (RLS "public read").
 */
export function createPublicClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
