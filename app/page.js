export const dynamic = 'force-dynamic'
import { createClient } from '@/lib/supabase/server'
import SearchBar from '@/components/SearchBar'
import CarCard from '@/components/CarCard'
import FeaturedCars from '@/components/FeaturedCars'

export default async function Home({ searchParams }) {
  const supabase = createClient()
  let query = supabase.from('cars').select('*').eq('status', 'approved')

  if (searchParams.city) query = query.ilike('city', `%${searchParams.city}%`)
  if (searchParams.minPrice) query = query.gte('price', parseFloat(searchParams.minPrice))
  if (searchParams.maxPrice) query = query.lte('price', parseFloat(searchParams.maxPrice))

  const { data: cars } = await query.order('created_at', { ascending: false })
  const { data: featured } = await supabase.from('cars').select('*').eq('is_featured', true).eq('status', 'approved').limit(6)

  return (
    <div>
      <div className="hero-gradient rounded-3xl p-8 md:p-16 mb-12 text-center border border-white/70 shadow-xl">
        <p className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-primary-700 shadow-sm mb-5">🚘 سوق السيارات الحديث في ليبيا</p>
        <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-4">اعثر على سيارتك المثالية في <span className="text-primary-600">ليبيا</span></h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">اشترِ وبِع وتواصل داخليًا مع البائعين والتجار بأمان كامل.</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto mb-8">
          <div className="bg-white rounded-2xl p-4 border"><p className="text-2xl font-black text-primary-600">{cars?.length || 0}</p><p className="text-xs text-gray-500">سيارات متاحة</p></div>
          <div className="bg-white rounded-2xl p-4 border"><p className="text-2xl font-black text-primary-600">{featured?.length || 0}</p><p className="text-xs text-gray-500">مميزة</p></div>
          <div className="bg-white rounded-2xl p-4 border"><p className="text-2xl font-black text-primary-600">24/7</p><p className="text-xs text-gray-500">دردشة داخلية</p></div>
          <div className="bg-white rounded-2xl p-4 border"><p className="text-2xl font-black text-primary-600">3</p><p className="text-xs text-gray-500">باقات التجار</p></div>
        </div>
        <SearchBar />
      </div>

      {featured?.length > 0 && <FeaturedCars cars={featured} />}

      <section className="mt-16">
        <div className="flex items-center justify-between gap-3 mb-8">
          <div className="flex items-center gap-3"><div className="h-1 w-12 bg-primary-600 rounded-full"></div><h2 className="text-3xl font-extrabold text-gray-900">كل الإعلانات</h2></div>
          <span className="text-sm text-gray-500">{cars?.length || 0} نتيجة</span>
        </div>
        {cars && cars.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {cars.map(car => <CarCard key={car.id} car={car} />)}
          </div>
        ) : (
          <p className="text-gray-400 text-center py-20">لا توجد سيارات مطابقة، جرّب بحثًا آخر.</p>
        )}
      </section>
    </div>
  )
}
