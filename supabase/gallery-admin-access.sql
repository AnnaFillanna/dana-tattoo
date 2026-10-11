-- Apply in the existing Supabase project. Restricts, never expands, gallery access.
-- Dana's existing public auth.users ID; no password or private key is stored here.
begin;
create policy "Gallery restricted to Dana"
on storage.objects as restrictive for all to authenticated
using (
  bucket_id <> 'gallery' or (
    (select auth.uid()) = 'fd75a2b5-10a6-4881-97f9-59c7e87f3b6c'::uuid
    and (storage.foldername(name))[1] = 'portfolio'
  )
)
with check (
  bucket_id <> 'gallery' or (
    (select auth.uid()) = 'fd75a2b5-10a6-4881-97f9-59c7e87f3b6c'::uuid
    and (storage.foldername(name))[1] = 'portfolio'
  )
);
commit;
