"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function deleteAdhesion(formData: FormData) {
  const supabase = await createClient();
  const id = String(formData.get("id") || "");
  const { error } = await supabase.from("adhesions").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/adhesions");
  revalidatePath("/admin");
}
