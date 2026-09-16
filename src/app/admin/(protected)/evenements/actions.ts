"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

async function uploadImageIfPresent(
  supabase: Awaited<ReturnType<typeof createClient>>,
  file: File | null
): Promise<string | null> {
  if (!file || file.size === 0) return null;
  const ext = file.name.split(".").pop() || "jpg";
  const path = `events/${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from("photos").upload(path, file, {
    contentType: file.type || "image/jpeg",
    upsert: false,
  });
  if (error) throw new Error(error.message);
  const { data } = supabase.storage.from("photos").getPublicUrl(path);
  return data.publicUrl;
}

function revalidatePublicPages() {
  revalidatePath("/");
  revalidatePath("/evenements");
}

export async function createEvent(formData: FormData) {
  const supabase = await createClient();
  const imageUrl = await uploadImageIfPresent(supabase, formData.get("image") as File | null);

  const { error } = await supabase.from("events").insert({
    title: String(formData.get("title") || ""),
    date_label: String(formData.get("dateLabel") || ""),
    iso_date: String(formData.get("isoDate") || ""),
    time: String(formData.get("time") || "") || null,
    place: String(formData.get("place") || ""),
    description: String(formData.get("description") || ""),
    image_url: imageUrl || "/images/logo.jpg",
  });
  if (error) throw new Error(error.message);

  revalidatePublicPages();
  revalidatePath("/admin/evenements");
  revalidatePath("/admin");
}

export async function updateEvent(formData: FormData) {
  const supabase = await createClient();
  const id = String(formData.get("id") || "");
  const newImageUrl = await uploadImageIfPresent(supabase, formData.get("image") as File | null);

  const update: Record<string, unknown> = {
    title: String(formData.get("title") || ""),
    date_label: String(formData.get("dateLabel") || ""),
    iso_date: String(formData.get("isoDate") || ""),
    time: String(formData.get("time") || "") || null,
    place: String(formData.get("place") || ""),
    description: String(formData.get("description") || ""),
  };
  if (newImageUrl) update.image_url = newImageUrl;

  const { error } = await supabase.from("events").update(update).eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePublicPages();
  revalidatePath("/admin/evenements");
}

export async function deleteEvent(formData: FormData) {
  const supabase = await createClient();
  const id = String(formData.get("id") || "");
  const { error } = await supabase.from("events").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePublicPages();
  revalidatePath("/admin/evenements");
  revalidatePath("/admin");
}
