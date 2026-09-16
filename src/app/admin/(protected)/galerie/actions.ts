"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

function revalidatePublicPages() {
  revalidatePath("/galerie");
}

async function uploadPhoto(
  supabase: Awaited<ReturnType<typeof createClient>>,
  file: File
): Promise<string> {
  const ext = file.name.split(".").pop() || "jpg";
  const path = `gallery/${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from("photos").upload(path, file, {
    contentType: file.type || "image/jpeg",
  });
  if (error) throw new Error(error.message);
  const { data } = supabase.storage.from("photos").getPublicUrl(path);
  return data.publicUrl;
}

export async function addPhoto(formData: FormData) {
  const supabase = await createClient();
  const file = formData.get("image") as File | null;
  if (!file || file.size === 0) throw new Error("Choisissez une image.");

  const url = await uploadPhoto(supabase, file);

  const { error } = await supabase.from("gallery_photos").insert({
    url,
    caption: String(formData.get("caption") || ""),
  });
  if (error) throw new Error(error.message);

  revalidatePublicPages();
  revalidatePath("/admin/galerie");
  revalidatePath("/admin");
}

export async function updatePhoto(formData: FormData) {
  const supabase = await createClient();
  const id = String(formData.get("id") || "");
  const file = formData.get("image") as File | null;

  const update: Record<string, unknown> = {
    caption: String(formData.get("caption") || ""),
  };
  if (file && file.size > 0) {
    update.url = await uploadPhoto(supabase, file);
  }

  const { error } = await supabase.from("gallery_photos").update(update).eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePublicPages();
  revalidatePath("/admin/galerie");
}

export async function deletePhoto(formData: FormData) {
  const supabase = await createClient();
  const id = String(formData.get("id") || "");
  const { error } = await supabase.from("gallery_photos").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePublicPages();
  revalidatePath("/admin/galerie");
  revalidatePath("/admin");
}
