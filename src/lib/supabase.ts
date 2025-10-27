import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const hasSupabase = Boolean(supabaseUrl && supabaseAnonKey);

// Guard against missing envs in production to avoid runtime crash
export const supabase = hasSupabase
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : null;

export interface GalleryImage {
  id: string;
  url: string;
  order_index: number;
  created_at: string;
}
