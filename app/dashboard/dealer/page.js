export const dynamic = 'force-dynamic'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import { revalidatePath } from 'next/cache'

export default async function DealerDashboard() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: cars } = await supabase.from('cars').select('*').eq('user_id', user.id).order('created_at', { ascending: false })
  const { data: subscription } = await supabase.from('subscriptions').select('*').eq('user_id', user.id).single()

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-wrap justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">Dashboard</h1>
        <Link href="/cars/sell"><Button>+ Add Car</Button></Link>
      </div>
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-2xl shadow-sm border"><p className="text-sm text-gray-500">Plan</p><p className="text-2xl font-bold text-primary-600">{subscription?.plan || 'Free'}</p></div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border"><p className="text-sm text-gray-500">Listings</p><p className="text-2xl font-bold">{cars?.length || 0}</p></div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border"><Link href="/messages" className="text-primary-600 font-medium">💬 Messages →</Link></div>
      </div>
      <h2 className="text-xl font-bold mb-4">Your Cars</h2>
      <div className="space-y-3">
        {cars?.map(car => (
          <div key={car.id} className="flex items-center justify-between bg-white p-5 rounded-2xl shadow-sm border">
            <div><h3 className="font-semibold">{car.title}</h3><p className="text-sm text-gray-500">{car.status}</p></div>
            <div className="flex gap-2">
              <Link href={`/cars/${car.id}`}><Button variant="secondary" size="sm">View</Button></Link>
              <form action={async () => { 'use server'; const sup = createClient(); await sup.from('cars').delete().eq('id', car.id); revalidatePath('/dashboard/dealer') }}>
                <button type="submit" className="text-red-500 hover:underline text-sm">Delete</button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
