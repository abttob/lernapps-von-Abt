-- Neue, getrennte Klasse GLZ24A anlegen
-- Einmalig im Supabase SQL-Editor ausführen (Project > SQL Editor > New query > Run).
-- Die bisherige Klasse (Belagsaufbau) funktioniert danach genau gleich wie vorher.

-- 1) Profile erhalten eine Spalte «klasse» (bisherige Lernende: leer)
alter table public.profiles add column if not exists klasse text;

-- 2) Klassencode für GLZ24A hinterlegen (weitere Klassen später gleich: 'class_code:<Name>', '<Code>')
insert into public.app_config(key,value) values ('class_code:GLZ24A','GLZ24A')
  on conflict (key) do update set value = excluded.value;

-- 3) Registrierung: bisheriger Klassencode, Lehrercode oder ein Code einer weiteren Klasse
create or replace function public.handle_new_user() returns trigger language plpgsql security definer set search_path=public as $$
declare
  c  text := coalesce(new.raw_user_meta_data->>'code','');
  r  text;
  kl text := null;
  t  text;
  k  text;
begin
  select value into t from public.app_config where key='teacher_code';
  select value into k from public.app_config where key='class_code';
  if c = t then
    r := 'teacher';
    kl := nullif(new.raw_user_meta_data->>'klasse','');
  elsif c = k then
    r := 'student';
  else
    select substring(key from 12) into kl from public.app_config
      where key like 'class\_code:%' and value = c limit 1;
    if kl is null then raise exception 'Klassencode falsch'; end if;
    r := 'student';
  end if;
  insert into public.profiles(id,name,role,klasse)
    values (new.id, coalesce(new.raw_user_meta_data->>'name','?'), r, kl);
  return new;
end $$;
