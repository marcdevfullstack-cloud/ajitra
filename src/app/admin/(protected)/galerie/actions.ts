"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

function revalidatePublicPages() {
  revalidatePath("/galerie");
}

export async function addPhoto(formData: FormData) {
  const supabase = await createClient();
  const file = formData.get("image") as File | null;
  if (!file || file.size === 0) throw new Error("Choisissez une image.");

  const ext = file.name.split(".").pop() || "jpg";
  const path = `gallery/${crypto.randomUUID()}.${ext}`;
  const { error: uploadError } = await supabase.storage.from("photos").upload(path, file, {
    contentType: file.type || "image/jpeg",
  });
  if (uploadError) throw new Error(uploadError.message);

  const { data } = supabase.storage.from("photos").getPublicUrl(path);

  const { error } = await supabase.from("gallery_photos").insert({
    url: data.publicUrl,
    caption: String(formData.get("caption") || ""),
  });
  if (error) throw new Error(error.message);

  revalidatePublicPages();
  revalidatePath("/admin/galerie");
  revalidatePath("/admin");
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
