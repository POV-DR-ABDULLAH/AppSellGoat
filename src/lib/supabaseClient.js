import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  // Helpful warning in dev if envs are missing
  // Do not throw to avoid breaking the app UI
  // eslint-disable-next-line no-console
  console.warn("Supabase env vars are missing. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
