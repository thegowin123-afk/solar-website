import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const isValidUrl = (url) => {
  if (!url) return false;
  try {
    const u = new URL(url);
    return u.protocol === 'http:' || u.protocol === 'https:';
  } catch {
    return false;
  }
};

const FALLBACK_URL = 'https://placeholder.supabase.co';
const FALLBACK_KEY = 'placeholder-anon-key';

const resolvedUrl = isValidUrl(supabaseUrl) ? supabaseUrl : FALLBACK_URL;
const resolvedKey = supabaseAnonKey || FALLBACK_KEY;

if (!isValidUrl(supabaseUrl) || !supabaseAnonKey) {
  console.warn(
    '[SolarPlan] Supabase env vars missing or invalid. ' +
    'Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in Vercel environment variables.'
  );
}

export const supabase = createClient(resolvedUrl, resolvedKey, {
  auth: { persistSession: false },
});
