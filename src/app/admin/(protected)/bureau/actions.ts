"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

function revalidatePublicPages() {
  revalidatePath("/");
  revalidatePath("/a-propos");
}

async function uploadPhotoIfPresent(
  supabase: Awaited<ReturnType<typeof createClient>>,
  file: File | null
): Promise<string | null> {
  if (!file || file.size === 0) return null;
  const ext = file.name.split(".").pop() || "jpg";
  const path = `bureau/${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from("photos").upload(path, file, {
    contentType: file.type || "image/jpeg",
  });
  if (error) throw new Error(error.message);
  const { data } = supabase.storage.from("photos").getPublicUrl(path);
  return data.publicUrl;
}

function parseMemberSince(formData: FormData): number | null {
  const raw = String(formData.get("memberSince") || "").trim();
  if (!raw) return null;
  const n = Number(raw);
  return Number.isFinite(n) ? n : null;
}

export async function createMember(formData: FormData) {
  const supabase = await createClient();
  const photoUrl = await uploadPhotoIfPresent(supabase, formData.get("photo") as File | null);

  const { error } = await supabase.from("bureau_members").insert({
    role: String(formData.get("role") || ""),
    name: String(formData.get("name") || ""),
    sort_order: Number(formData.get("sortOrder") || 0),
    member_since: parseMemberSince(formData),
    photo_url: photoUrl,
  });
  if (error) throw new Error(error.message);

  revalidatePublicPages();
  revalidatePath("/admin/bureau");
  revalidatePath("/admin");
}

export async function updateMember(formData: FormData) {
  const supabase = await createClient();
  const id = String(formData.get("id") || "");
  const newPhotoUrl = await uploadPhotoIfPresent(supabase, formData.get("photo") as File | null);

  const update: Record<string, unknown> = {
    role: String(formData.get("role") || ""),
    name: String(formData.get("name") || ""),
    sort_order: Number(formData.get("sortOrder") || 0),
    member_since: parseMemberSince(formData),
  };
  if (newPhotoUrl) update.photo_url = newPhotoUrl;

  const { error } = await supabase.from("bureau_members").update(update).eq("id", id);
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
