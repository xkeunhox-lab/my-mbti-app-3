import { createClient } from "@supabase/supabase-js";

// docs/supabase-info.md 에 기재된 프로젝트 정보를 직접 하드코딩합니다.
const SUPABASE_PROJECT_ID = "vmdathlgogmxxymbwieu";
const supabaseUrl = `https://${SUPABASE_PROJECT_ID}.supabase.co`;
const supabaseAnonKey = "sb_publishable_7ucoB48vF9z3RWEdh7Jc6Q_hKuYLqQr";

export function createSupabaseServerClient() {
  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: { persistSession: false },
  });
}

export async function getParticipantCount(): Promise<number> {
  const supabase = createSupabaseServerClient();
  const { count, error } = await supabase
    .from("mbti_results")
    .select("*", { count: "exact", head: true });

  if (error) {
    console.error("[getParticipantCount] failed to fetch count:", error.message);
    return 0;
  }

  return count ?? 0;
}
