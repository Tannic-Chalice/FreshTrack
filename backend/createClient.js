import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
    "https://yizctugzbflqqeindzuq.supabase.co",
    "Supabase_api_key"
)

