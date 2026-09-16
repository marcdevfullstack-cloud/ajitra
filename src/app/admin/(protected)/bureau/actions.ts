"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

function revalidatePublicPages() {
  revalidatePath("/");
  revalidatePath("/a-propos");
}

export async function createMember(formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.from("bureau_members").insert({
    role: String(formData.get("role") || ""),
    name: String(formData.get("name") || ""),
    sort_order: Number(formData.get("sortOrder") || 0),
  });
  if (error) throw new Error(error.message);

  revalidatePublicPages();
  revalidatePath("/admin/bureau");
  revalidatePath("/admin");
}

export async function updateMember(formData: FormData) {
  const supabase = await createClient();
  const id = String(formData.get("id") || "");
  const { error } = await supabase
    .from("bureau_members")
    .update({
      role: String(formData.get("role") || ""),
      name: String(formData.get("name") || ""),
      sort_order: Number(formData.get("sortOrder") || 0),
    })
    .eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePublicPages();
  revalidatePath("/admin/bureau");
}

export async function deleteMember(formData: FormData) {
  const supabase = await createClient();
  const id = String(formData.get("id") || "");
  const { error } = await supabase.from("bureau_members").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePublicPages();
  revalidatePath("/admin/bureau");
  revalidatePath("/admin");
}
