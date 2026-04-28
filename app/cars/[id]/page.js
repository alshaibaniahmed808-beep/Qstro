import { createClient } from '@/lib/supabase/server'
import ImageGallery from '@/components/ImageGallery'
import { formatPrice } from '@/lib/utils'
import ChatSellerButton from './ChatSellerButton'

export default async function CarPage({ params }) {
  const supabase = createClient()
  const { data: car } = await supabase.from('cars').select('*, users!user_id(name)').eq('id', params.id).single()

  if (!car || (car.status !== 'approved' && !(await supabase.auth.getUser()).data.user?.id === car.user_id)) {
    return <div className="text-center py-20 text-2xl text-gray-400">🚗 Car not found</div>
  }

  return (
    <div className="max-w-5xl mx-auto">
      <ImageGallery images={car.images} />
      <div className="mt-8 grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900">{car.title}</h1>
            <p className="text-3xl font-bold text-primary-600 mt-2">{formatPrice(car.price)}</p>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <span>📍 {car.city}</span>
            <span className="text-gray-300">|</span>
            <span>👤 {car.users?.name || 'Unknown'}</span>
          </div>
          <div className="prose max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap border-t pt-6">
            {car.description}
          </div>
        </div>
        <div className="md:col-span-1">
          <div className="bg-gray-50 rounded-2xl p-6 sticky top-24 shadow-sm border border-gray-100">
            <p className="font-semibold text-gray-900 mb-4">Interested in this car?</p>
            <ChatSellerButton carId={car.id} sellerId={car.user_id} />
            <p className="text-xs text-gray-400 mt-4">💬 Message the seller directly</p>
          </div>
        </div>
      </div>
    </div>
  )
}
