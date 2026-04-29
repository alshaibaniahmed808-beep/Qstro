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
      {/* Hero Section */}
      <div className="hero-gradient rounded-3xl p-8 md:p-16 mb-12 text-center">
        <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-4">
          Find Your Dream Car in <span className="text-primary-600">Libya</span>
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-8">
          The safest and fastest way to buy and sell cars. Connect with verified dealers.
        </p>
        <SearchBar />
      </div>

      {featured?.length > 0 && <FeaturedCars cars={featured} />}

      <section className="mt-16">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-1 w-12 bg-primary-600 rounded-full"></div>
          <h2 className="text-3xl font-extrabold text-gray-900">All Listings</h2>
        </div>
        {cars && cars.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {cars.map(car => <CarCard key={car.id} car={car} />)}
          </div>
        ) : (
          <p className="text-gray-400 text-center py-20">No cars found. Try a different search.</p>
        )}
      </section>
    </div>
  )
      }
