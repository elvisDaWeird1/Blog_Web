// src/supabaseClient.js
import { createClient } from "@supabase/supabase-js";

// ⚠️ Dùng API URL và ANON KEY từ Supabase Dashboard > Project Settings > API
const supabaseUrl = "https://temjeqmplmhorbgkvrzj.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRlbWplcW1wbG1ob3JiZ2t2cnpqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE1MzY1OTksImV4cCI6MjA3NzExMjU5OX0.4sQwYRXCHenbe7KHN5bRO3kBMS4HzwNLR8_a7DPIgv4";

export const supabase = createClient(supabaseUrl, supabaseKey);
