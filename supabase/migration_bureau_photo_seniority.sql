-- AJTRA — mise à jour : photo et ancienneté pour les membres du bureau
-- À coller dans Supabase : Project > SQL Editor > New query > Run

alter table bureau_members add column if not exists photo_url text;
alter table bureau_members add column if not exists member_since int;
