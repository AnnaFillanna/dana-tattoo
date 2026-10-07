import type { SupabaseClient } from '@supabase/supabase-js';

let client: SupabaseClient | undefined;

export async function getSupabase(): Promise<SupabaseClient | null> {
  const url = import.meta.env.VITE_SUPABASE_URL?.trim();
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();
  // Do not initialise browser auth during static prerendering.
  if (typeof window === 'undefined' || !url || !key) return null;
  if (!client) {
    const { createClient } = await import('@supabase/supabase-js');
    if (client) return client;
    client = createClient(url, key, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: false },
    });
  }
  return client;
}
