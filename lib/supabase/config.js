const FALLBACK_URL = 'https://wgdvnfbrypxikwzefvya.supabase.co'
const FALLBACK_KEY = 'sb_publishable_HKdF6FBMq-2NUY4P2Q1GiA_tHCtAIW0'

export function getSupabaseConfig() {
  return {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL || FALLBACK_URL,
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || FALLBACK_KEY,
  }
}
