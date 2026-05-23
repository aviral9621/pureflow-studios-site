import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

if (!url || !anonKey) {
  // Soft-fail in dev so the site still loads, but every Supabase call will be a no-op
  // that throws when the user actually submits a form.

  console.warn(
    '[supabase] VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY is not set. Forms will not persist.'
  );
}

export const supabase = createClient(url ?? 'http://invalid', anonKey ?? 'invalid', {
  auth: { persistSession: false },
});

export const isSupabaseConfigured = Boolean(url && anonKey);
