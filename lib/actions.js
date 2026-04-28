'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function login(formData) {
  const supabase = createClient()
  const { error } = await supabase.auth.signInWithPassword({
    email: formData.get('email'),
    password: formData.get('password'),
  })
  if (error) return { error: error.message }
  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signup(formData) {
  const supabase = createClient()
  const { error } = await supabase.auth.signUp({
    email: formData.get('email'),
    password: formData.get('password'),
    options: { data: { name: formData.get('name') } },
  })
  if (error) return { error: error.message }
  redirect('/')
}

export async function signOut() {
  const supabase = createClient()
  await supabase.auth.signOut()
  redirect('/')
}

export async function approveCar(carId) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: profile } = await supabase.from('users').select('role').eq('id', user.id).single()
  if (profile?.role !== 'admin') throw new Error('Unauthorized')
  await supabase.from('cars').update({ status: 'approved' }).eq('id', carId)
  revalidatePath('/dashboard/admin')
}

export async function approvePayment(paymentId) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: profile } = await supabase.from('users').select('role').eq('id', user.id).single()
  if (profile?.role !== 'admin') throw new Error('Unauthorized')
  await supabase.from('payments').update({ status: 'approved' }).eq('id', paymentId)
  const { data: payment } = await supabase.from('payments').select('user_id').eq('id', paymentId).single()
  if (payment) {
    const expires = new Date()
    expires.setDate(expires.getDate() + 30)
    await supabase.from('subscriptions').upsert({
      user_id: payment.user_id,
      status: 'active',
      expires_at: expires.toISOString(),
    })
  }
  revalidatePath('/dashboard/admin')
}

export async function createCar(formData, imageUrls) {
  'use server'
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const car = {
    title: formData.get('title'),
    price: parseFloat(formData.get('price')),
    city: formData.get('city'),
    description: formData.get('description'),
    images: imageUrls,
    user_id: user.id,
    status: 'pending',
  }
  await supabase.from('cars').insert(car)
  redirect('/dashboard/dealer')
}
