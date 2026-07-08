import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

type WithRelationships<T> = {
  [K in keyof T]: T[K] & { Relationships: [] };
};

type SupabaseDatabase = {
  public: Omit<Database["public"], "Tables" | "Views"> & {
    Tables: WithRelationships<Database["public"]["Tables"]>;
    Views: WithRelationships<Database["public"]["Views"]>;
  };
};

export function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl) {
    throw new Error("Missing environment variable: NEXT_PUBLIC_SUPABASE_URL");
  }

  if (!serviceRoleKey) {
    throw new Error("Missing environment variable: SUPABASE_SERVICE_ROLE_KEY");
  }

  return createClient<SupabaseDatabase>(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
