import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { getSupabaseConfig } from '@/lib/supabase/config'

export function createClient() {
  const cookieStore = cookies()
  const { url, anonKey } = getSupabaseConfig()
  return createServerClient(
    url,
    anonKey,
    {
      cookies: {
        get(name) { return cookieStore.get(name)?.value },
        set(name, value, options) { cookieStore.set({ name, value, ...options }) },
        remove(name, options) { cookieStore.set({ name, value: '', ...options }) },
      },
    }
  )
}
