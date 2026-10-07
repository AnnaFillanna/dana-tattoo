-- Run once in Supabase SQL Editor. Allows visitors to list published portfolio
-- photos only. Does not grant INSERT, UPDATE or DELETE to anonymous visitors.
begin;
drop policy if exists "Visitors can read published portfolio photos 1vs8c42_0" on storage.objects;
create policy "Visitors can read published portfolio photos 1vs8c42_0"
on storage.objects for select to anon
using (bucket_id = 'gallery' and (storage.foldername(name))[1] = 'portfolio');
commit;
