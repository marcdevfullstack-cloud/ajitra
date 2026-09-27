"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

function revalidateAdmin() {
  revalidatePath("/admin/membres");
  revalidatePath("/admin/adhesions");
  revalidatePath("/admin");
}

export async function createMemberManually(formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase.from("members").insert({
    full_name: String(formData.get("fullName") || ""),
    phone: String(formData.get("phone") || ""),
    email: String(formData.get("email") || "") || null,
    residence: String(formData.get("residence") || "") || null,
    profession: String(formData.get("profession") || "") || null,
    formation: String(formData.get("formation") || "") || null,
    skills: String(formData.get("skills") || "") || null,
    interest_domain: String(formData.get("interestDomain") || "") || null,
    join_date: String(formData.get("joinDate") || "") || undefined,
    status: String(formData.get("status") || "actif"),
    responsibilities: String(formData.get("responsibilities") || "") || null,
    notes: String(formData.get("notes") || "") || null,
  });
  if (error) throw new Error(error.message);

  revalidateAdmin();
}

export async function updateMember(formData: FormData) {
  const supabase = await createClient();
  const id = String(formData.get("id") || "");

  const { error } = await supabase
    .from("members")
    .update({
      full_name: String(formData.get("fullName") || ""),
      phone: String(formData.get("phone") || ""),
      email: String(formData.get("email") || "") || null,
      residence: String(formData.get("residence") || "") || null,
      profession: String(formData.get("profession") || "") || null,
      formation: String(formData.get("formation") || "") || null,
      skills: String(formData.get("skills") || "") || null,
      interest_domain: String(formData.get("interestDomain") || "") || null,
      join_date: String(formData.get("joinDate") || "") || undefined,
      status: String(formData.get("status") || "actif"),
      responsibilities: String(formData.get("responsibilities") || "") || null,
      notes: String(formData.get("notes") || "") || null,
    })
    .eq("id", id);
  if (error) throw new Error(error.message);

  revalidateAdmin();
}

export async function deleteMember(formData: FormData) {
  const supabase = await createClient();
  const id = String(formData.get("id") || "");
  const { error } = await supabase.from("members").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidateAdmin();
}

export async function convertAdhesionToMember(formData: FormData) {
  const supabase = await createClient();
  const adhesionId = String(formData.get("adhesionId") || "");
  const fullName = String(formData.get("fullName") || "");
  const phone = String(formData.get("phone") || "");
  const email = String(formData.get("email") || "") || null;
  const residence = String(formData.get("residence") || "") || null;

  const { error: insertError } = await supabase.from("members").insert({
    full_name: fullName,
    phone,
    email,
    residence,
    status: "actif",
  });
  if (insertError) throw new Error(insertError.message);

  const { error: updateError } = await supabase
    .from("adhesions")
    .update({ status: "converti" })
    .eq("id", adhesionId);
  if (updateError) throw new Error(updateError.message);

  revalidateAdmin();
}
