import CarCard from './CarCard'

export default function FeaturedCars({ cars }) {
  if (!cars || cars.length === 0) return null
  return (
    <section className="mt-16">
      <div className="flex items-center gap-3 mb-8">
        <div className="h-1 w-12 bg-primary-600 rounded-full"></div>
        <h2 className="text-3xl font-extrabold text-gray-900">⭐ Featured Cars</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {cars.map(car => <CarCard key={car.id} car={car} />)}
      </div>
    </section>
  )
}
