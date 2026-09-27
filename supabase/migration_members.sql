-- AJTRA — mise à jour : base de données des membres
-- À coller dans Supabase : Project > SQL Editor > New query > Run

create table if not exists members (
  id uuid primary key default gen_random_uuid(),
  member_no int generated always as identity,
  full_name text not null,
  phone text not null,
  email text,
  residence text,
  profession text,
  formation text,
  skills text,
  interest_domain text,
  join_date date not null default current_date,
  status text not null default 'actif' check (status in ('actif', 'inactif', 'suspendu')),
  responsibilities text,
  notes text,
  created_at timestamptz not null default now()
);

-- Table strictement interne : aucune lecture publique, tout passe par un compte connecté.
alter table members enable row level security;

create policy "auth all members" on members for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- Permet de savoir quelles demandes d'adhésion ont déjà été converties en membre.
alter table adhesions add column if not exists status text not null default 'nouveau';

-- Il manquait une règle pour pouvoir marquer une demande comme "convertie".
drop policy if exists "auth update adhesions" on adhesions;
create policy "auth update adhesions" on adhesions for update
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
