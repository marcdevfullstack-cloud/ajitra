-- AJTRA — schéma de base de données
-- À coller une seule fois dans Supabase : Project > SQL Editor > New query > Run

create extension if not exists pgcrypto;

-- ---------- Tables ----------

create table if not exists site_settings (
  id int primary key default 1,
  tagline text not null default '',
  slogan_brong text not null default '',
  slogan_fr text not null default '',
  mission text[] not null default '{}',
  call_to_join text not null default '',
  meeting_frequency text not null default '',
  meeting_time text not null default '',
  meeting_place text not null default '',
  facebook_url text not null default '',
  whatsapp_url text not null default '',
  whatsapp_number text not null default '',
  email text not null default '',
  constraint single_row check (id = 1)
);

create table if not exists bureau_members (
  id uuid primary key default gen_random_uuid(),
  role text not null,
  name text not null,
  photo_url text,
  member_since int,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  date_label text not null,
  iso_date date not null,
  time text,
  place text not null,
  description text not null,
  image_url text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists gallery_photos (
  id uuid primary key default gen_random_uuid(),
  url text not null,
  caption text not null default '',
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists adhesions (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone text not null,
  email text,
  residence text,
  relation text,
  message text,
  created_at timestamptz not null default now()
);

-- ---------- Row Level Security ----------
-- Lecture publique (le site est public), écriture réservée aux comptes connectés (l'admin).

alter table site_settings enable row level security;
alter table bureau_members enable row level security;
alter table events enable row level security;
alter table gallery_photos enable row level security;
alter table adhesions enable row level security;

create policy "public read site_settings" on site_settings for select using (true);
create policy "public read bureau_members" on bureau_members for select using (true);
create policy "public read events" on events for select using (true);
create policy "public read gallery_photos" on gallery_photos for select using (true);

create policy "auth write site_settings" on site_settings for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "auth write bureau_members" on bureau_members for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "auth write events" on events for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "auth write gallery_photos" on gallery_photos for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "public insert adhesions" on adhesions for insert
  with check (true);
create policy "auth read adhesions" on adhesions for select
  using (auth.role() = 'authenticated');
create policy "auth delete adhesions" on adhesions for delete
  using (auth.role() = 'authenticated');

-- ---------- Stockage des photos ----------

insert into storage.buckets (id, name, public)
values ('photos', 'photos', true)
on conflict (id) do nothing;

create policy "public read photos bucket" on storage.objects for select
  using (bucket_id = 'photos');
create policy "auth upload photos bucket" on storage.objects for insert
  with check (bucket_id = 'photos' and auth.role() = 'authenticated');
create policy "auth delete photos bucket" on storage.objects for delete
  using (bucket_id = 'photos' and auth.role() = 'authenticated');

-- ---------- Contenu initial (le contenu déjà validé du site) ----------

insert into site_settings (id, tagline, slogan_brong, slogan_fr, mission, call_to_join, meeting_frequency, meeting_time, meeting_place, facebook_url, whatsapp_url, whatsapp_number, email)
values (
  1,
  'Unis pour le développement de Transua !',
  'Sɛ biakun wɛri adro a, ɔ gu',
  'Si une seule personne enlève l''écorce d''un arbre, elle la perd.',
  array[
    'L''Amicale des Jeunes de Transua (AJTRA) regroupe en son sein des jeunes filles et garçons ressortissants de Transua.',
    'Son objectif est de regrouper, entretenir les relations fraternelles et la solidarité entre les fils et filles de ce village.',
    'Juste pour dire que l''union fait la force. Alors pourquoi ne pas nous unir ?'
  ],
  'Si vous êtes ressortissant(e) de Transua ou du Département de Transua, cette amicale est la vôtre : elle a besoin de vous, et de nous, pour vivre. Sachez que nous sommes très heureux de vous recevoir.',
  'Le 2ème dimanche de chaque mois',
  '10h00',
  'Adjamé, Collège Victor Schoelcher',
  'https://www.facebook.com/amicale.ajtra',
  '',
  '',
  ''
)
on conflict (id) do nothing;

insert into bureau_members (role, name, sort_order) values
  ('Président(e)', 'À compléter', 1),
  ('Vice-Président(e)', 'À compléter', 2),
  ('Secrétaire Général(e)', 'À compléter', 3),
  ('Trésorier(ère)', 'À compléter', 4),
  ('Chargé(e) de communication', 'À compléter', 5),
  ('Chargé(e) de l''organisation', 'À compléter', 6);

insert into events (title, date_label, iso_date, time, place, description, image_url) values
  (
    'Rencontre avec M. Koffi Claude Leblanc',
    'Dimanche 10 mai 2026', '2026-05-10', '10h00', 'Adjamé, 220 Logements',
    'L''AJTRA reçoit M. Koffi Claude Leblanc, cadre et fils de Transua, pour un moment d''échange fraternel.',
    '/images/event-1.jpg'
  ),
  (
    'Conférence-débat — Construire une nouvelle mentalité pour bâtir un futur prospère',
    'Dimanche 7 juin 2026', '2026-06-07', '11h00 GMT', 'Grand-Bassam, Côte d''Ivoire',
    'Une rencontre inspirante pour Transua. Conférencier d''honneur : M. Adoua Kouassi, cadre et fils de Transua.',
    '/images/event-2.jpg'
  ),
  (
    'Cérémonie de fin de mandat & sortie détente',
    'Dimanche 7 juin 2026', '2026-06-07', null, 'Grand-Bassam, Côte d''Ivoire',
    'Au programme : conférence, bilan de mandat, échanges. Participation : 5 000 FCFA.',
    '/images/event-3.jpg'
  );
