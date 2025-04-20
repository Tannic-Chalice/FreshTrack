import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
    "https://yizctugzbflqqeindzuq.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlpemN0dWd6YmZscXFlaW5kenVxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY0NDE2MDAsImV4cCI6MjA1MjAxNzYwMH0.utKzBv3DFk0ObbV2MaR0mqs5yqDU4iz2m8K3NVX8is0"
)

