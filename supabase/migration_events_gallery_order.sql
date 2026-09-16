-- AJTRA — mise à jour : ordre d'affichage pour les événements et la galerie
-- À coller dans Supabase : Project > SQL Editor > New query > Run

alter table events add column if not exists sort_order int not null default 0;
alter table gallery_photos add column if not exists sort_order int not null default 0;
