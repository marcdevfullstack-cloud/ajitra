"use server";

import { createClient } from "@/lib/supabase/server";
import { hasSupabase } from "@/lib/queries";
import type { AdhesionInput } from "@/lib/data";

export async function submitAdhesion(input: AdhesionInput) {
  if (!hasSupabase) {
    throw new Error("not_configured");
  }

  const supabase = await createClient();
  const { error } = await supabase.from("adhesions").insert({
    full_name: input.fullName,
    phone: input.phone,
    email: input.email || null,
    residence: input.residence || null,
    relation: input.relation || null,
    message: input.message || null,
  });

  if (error) throw new Error(error.message);
}
