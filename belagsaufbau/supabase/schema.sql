-- Einmalig im Supabase SQL-Editor ausführen (Project > SQL Editor > New query > Run).
-- VORHER die beiden Codes unten ändern!

create table if not exists public.app_config (key text primary key, value text not null);
insert into public.app_config(key,value) values ('class_code','KLASSENCODE-AENDERN'),('teacher_code','LEHRERCODE-AENDERN')
 on conflict (key) do nothing;
alter table public.app_config enable row level security;   -- keine Policy: nur der Trigger darf lesen

create table if not exists public.profiles (id uuid primary key references auth.users(id) on delete cascade, name text not null, role text not null check (role in ('student','teacher')), created_at timestamptz default now());
create table if not exists public.progress (user_id uuid references auth.users(id) on delete cascade, slug text, pct int default 0, data jsonb default '{}', updated_at timestamptz default now(), primary key (user_id,slug));
create table if not exists public.records (id uuid primary key default gen_random_uuid(), kind text not null, grp text, owner uuid not null default auth.uid() references auth.users(id) on delete cascade, owner_name text, data jsonb not null default '{}', created_at timestamptz default now());
create index if not exists records_kind_idx on public.records(kind, created_at desc);

create or replace function public.is_teacher() returns boolean language sql security definer set search_path=public stable as
$$ select exists(select 1 from public.profiles where id=auth.uid() and role='teacher') $$;

-- Registrierung nur mit richtigem Code; legt das Profil an
create or replace function public.handle_new_user() returns trigger language plpgsql security definer set search_path=public as $$
declare c text := coalesce(new.raw_user_meta_data->>'code',''); r text; t text; k text;
begin
  select value into t from public.app_config where key='teacher_code';
  select value into k from public.app_config where key='class_code';
  if c = t then r := 'teacher'; elsif c = k then r := 'student'; else raise exception 'Klassencode falsch'; end if;
  insert into public.profiles(id,name,role) values (new.id, coalesce(new.raw_user_meta_data->>'name','?'), r);
  return new;
end $$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.progress enable row level security;
alter table public.records enable row level security;

create policy "profiles lesen" on public.profiles for select to authenticated using (true);
create policy "progress eigene lesen" on public.progress for select to authenticated using (user_id=auth.uid() or public.is_teacher());
create policy "progress eigene schreiben" on public.progress for insert to authenticated with check (user_id=auth.uid());
create policy "progress eigene aendern" on public.progress for update to authenticated using (user_id=auth.uid()) with check (user_id=auth.uid());
create policy "records alle lesen" on public.records for select to authenticated using (true);
create policy "records eigene anlegen" on public.records for insert to authenticated with check (owner=auth.uid());
create policy "records eigene aendern" on public.records for update to authenticated using (owner=auth.uid() or public.is_teacher());
create policy "records eigene loeschen" on public.records for delete to authenticated using (owner=auth.uid() or public.is_teacher());

-- Foto-Ablage
insert into storage.buckets (id,name,public) values ('photos','photos',true) on conflict (id) do nothing;
create policy "fotos lesen" on storage.objects for select using (bucket_id='photos');
create policy "fotos hochladen" on storage.objects for insert to authenticated with check (bucket_id='photos' and (storage.foldername(name))[1]=auth.uid()::text);
create policy "fotos loeschen" on storage.objects for delete to authenticated using (bucket_id='photos' and ((storage.foldername(name))[1]=auth.uid()::text or public.is_teacher()));
