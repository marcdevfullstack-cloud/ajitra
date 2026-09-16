-- AJTRA — mise à jour : formulaire d'adhésion + numéro WhatsApp
-- À coller dans Supabase : Project > SQL Editor > New query > Run
-- (ne recollez pas schema.sql en entier, il a déjà été exécuté)

alter table site_settings add column if not exists whatsapp_number text not null default '';

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

alter table adhesions enable row level security;

create policy "public insert adhesions" on adhesions for insert
  with check (true);
create policy "auth read adhesions" on adhesions for select
  using (auth.role() = 'authenticated');
create policy "auth delete adhesions" on adhesions for delete
  using (auth.role() = 'authenticated');
