import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
      "https://ewownhvrgsvctszyiwdi.supabase.co",
      "yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3b3duaHZyZ3N2Y3Rzenlpd2RpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU2MDA0MDcsImV4cCI6MjAzMTE3NjQwN30.MgpCX9_7U-jT3Gf_evnZUGUh-poft_q5IDQCkTqSNRE"
  )
}