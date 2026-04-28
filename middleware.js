import { updateSession } from '@/lib/supabase/middleware'
import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function middleware(request) {
  const response = await updateSession(request)

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    { cookies: { get(name) { return request.cookies.get(name)?.value } } }
  )

  const { data: { user } } = await supabase.auth.getUser()
  const path = request.nextUrl.pathname

  if (path.startsWith('/auth') && user) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  const protectedRoutes = ['/cars/sell', '/dashboard', '/messages', '/subscription']
  if (protectedRoutes.some(r => path.startsWith(r)) && !user) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  if (path.startsWith('/dashboard/dealer')) {
    const { data: profile } = await supabase.from('users').select('role').eq('id', user?.id).single()
    if (profile?.role !== 'dealer' && profile?.role !== 'admin') {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  if (path.startsWith('/dashboard/admin')) {
    const { data: profile } = await supabase.from('users').select('role').eq('id', user?.id).single()
    if (profile?.role !== 'admin') {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|public/).*)'],
}
