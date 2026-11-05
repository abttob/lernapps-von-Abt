-- Klasse GLA25A für den «Checkout Abfall» freischalten
-- Einmalig im Supabase SQL-Editor ausführen (Project > SQL Editor > New query > Run).
-- Die Registrierung mit Klassencode-Prüfung (handle_new_user) besteht schon seit der Klasse GLZ24A,
-- darum braucht es nur diesen einen Eintrag. Klassencode für die Lernenden: GLA25A

insert into public.app_config(key,value) values ('class_code:GLA25A','GLA25A')
  on conflict (key) do update set value = excluded.value;
