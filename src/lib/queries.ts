import { createPublicClient } from "@/lib/supabase/public";
import {
  site as staticSite,
  bureau as staticBureau,
  events as staticEvents,
  gallery as staticGallery,
  type SiteSettings,
  type BureauMember,
  type Event,
  type GalleryPhoto,
} from "@/lib/data";

export const hasSupabase =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export type { SiteSettings };

/**
 * Tant que Supabase n'est pas configuré (variables d'environnement absentes),
 * le site reste pleinement fonctionnel grâce au contenu statique de data.ts.
 */
export async function getSiteSettings(): Promise<SiteSettings> {
  if (!hasSupabase) return staticSite;
  const supabase = createPublicClient();
  const { data } = await supabase.from("site_settings").select("*").eq("id", 1).maybeSingle();
  if (!data) return staticSite;

  return {
    name: staticSite.name,
    fullName: staticSite.fullName,
    tagline: data.tagline,
    slogan: { brong: data.slogan_brong, fr: data.slogan_fr },
    mission: (data.mission as string[]) ?? [],
    callToJoin: data.call_to_join,
    meetings: {
      frequency: data.meeting_frequency,
      time: data.meeting_time,
      place: data.meeting_place,
    },
    contact: {
      facebook: data.facebook_url,
      whatsapp: data.whatsapp_url,
      whatsappNumber: data.whatsapp_number ?? "",
      email: data.email,
    },
  };
}

export async function getBureau(): Promise<BureauMember[]> {
  if (!hasSupabase) return staticBureau;
  const supabase = createPublicClient();
  const { data } = await supabase
    .from("bureau_members")
    .select("*")
    .order("member_since", { ascending: true, nullsFirst: false })
    .order("sort_order", { ascending: true });
  if (!data || !data.length) return staticBureau;
  return data.map((m) => ({
    role: m.role,
    name: m.name,
    photoUrl: m.photo_url ?? undefined,
    memberSince: m.member_since ?? undefined,
  }));
}

export async function getEvents(): Promise<Event[]> {
  if (!hasSupabase) return staticEvents;
  const supabase = createPublicClient();
  const { data } = await supabase
    .from("events")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("iso_date", { ascending: true });
  if (!data) return staticEvents;
  return data.map((e) => ({
    id: e.id,
    title: e.title,
    dateLabel: e.date_label,
    isoDate: e.iso_date,
    time: e.time ?? undefined,
    place: e.place,
    description: e.description,
    image: e.image_url || "/images/logo.jpg",
    sortOrder: e.sort_order ?? 0,
  }));
}

export async function getGallery(): Promise<GalleryPhoto[]> {
  if (!hasSupabase) return staticGallery;
  const supabase = createPublicClient();
  const { data } = await supabase
    .from("gallery_photos")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });
  if (!data) return staticGallery;
  return data.map((g) => ({ src: g.url, caption: g.caption }));
}
