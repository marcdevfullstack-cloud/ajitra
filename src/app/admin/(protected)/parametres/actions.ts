"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function updateSettings(formData: FormData) {
  const supabase = await createClient();

  const missionRaw = String(formData.get("mission") || "");
  const mission = missionRaw
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  const { error } = await supabase
    .from("site_settings")
    .update({
      tagline: String(formData.get("tagline") || ""),
      slogan_brong: String(formData.get("sloganBrong") || ""),
      slogan_fr: String(formData.get("sloganFr") || ""),
      mission,
      call_to_join: String(formData.get("callToJoin") || ""),
      meeting_frequency: String(formData.get("meetingFrequency") || ""),
      meeting_time: String(formData.get("meetingTime") || ""),
      meeting_place: String(formData.get("meetingPlace") || ""),
      facebook_url: String(formData.get("facebook") || ""),
      whatsapp_url: String(formData.get("whatsapp") || ""),
      whatsapp_number: String(formData.get("whatsappNumber") || "").replace(/[^\d]/g, ""),
      email: String(formData.get("email") || ""),
    })
    .eq("id", 1);

  if (error) throw new Error(error.message);

  revalidatePath("/");
  revalidatePath("/a-propos");
  revalidatePath("/rejoindre");
  revalidatePath("/contact");
  revalidatePath("/admin/parametres");
}
