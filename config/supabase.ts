import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

// Create supabase client only if both URL and key are available
// This allows the build to succeed without env vars
let supabase: SupabaseClient;

if (supabaseUrl && supabaseKey) {
  supabase = createClient(supabaseUrl, supabaseKey);
} else {
  // Create a placeholder client that will be replaced at runtime
  // This is safe because during build, pages will use empty data
  supabase = createClient(
    "https://placeholder.supabase.co",
    "placeholder-key"
  );
}

export default supabase;
