-- Klasse GLA25A (gleiche Klasse für «Baugeräteführer Theorie» und «Checkout Abfall»)
-- Einmalig im Supabase SQL-Editor ausführen. Klassencode für die Lernenden: GLA25A
insert into public.app_config(key,value) values ('class_code:GLA25A','GLA25A')
  on conflict (key) do update set value = excluded.value;
delete from public.app_config where key = 'class_code:GLA25b';
