import Link from 'next/link'
import { formatPrice } from '@/lib/utils'
import Image from 'next/image'

export default function CarCard({ car }) {
  const imgSrc = car.images?.[0] || '/placeholder-car.jpg'
  return (
    <Link href={`/cars/${car.id}`} className="group block">
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 transform hover:-translate-y-1">
        <div className="relative h-56 w-full overflow-hidden">
          <Image src={imgSrc} alt={car.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
          {car.is_featured && (
            <span className="absolute top-3 left-3 bg-primary-600 text-white text-xs font-bold px-3 py-1 rounded-full">Featured</span>
          )}
        </div>
        <div className="p-5">
          <h3 className="font-bold text-xl text-gray-900 group-hover:text-primary-600 transition-colors">{car.title}</h3>
          <p className="text-primary-600 font-extrabold text-2xl mt-2">{formatPrice(car.price)}</p>
          <div className="flex items-center text-gray-500 text-sm mt-3">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {car.city}
          </div>
        </div>
      </div>
    </Link>
  )
}
