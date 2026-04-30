import Link from 'next/link'
import { formatPrice } from '@/lib/utils'
import Image from 'next/image'

export default function CarCard({ car }) {
  const imgSrc = (car.images && car.images[0]) || '/placeholder-car.jpg'
  return (
    <Link href={`/cars/${car.id}`} className="group block">
      <article className="bg-white rounded-2xl overflow-hidden card-shadow transition-all duration-300 border border-gray-100">
        <div className="relative h-52 w-full overflow-hidden">
          <Image src={imgSrc} alt={car.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
          {car.is_featured && <span className="absolute top-3 left-3 bg-primary-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">⭐ Featured</span>}
          <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm text-primary-700 text-sm font-bold px-3 py-1 rounded-full shadow">{formatPrice(car.price)}</div>
        </div>
        <div className="p-5">
          <h3 className="font-bold text-lg text-gray-900 group-hover:text-primary-600 transition line-clamp-1">{car.title}</h3>
          <p className="text-xs text-gray-400 mt-1">Posted {new Date(car.created_at).toLocaleDateString()}</p>
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center text-gray-500 text-sm">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              {car.city}
            </div>
            <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">{car.status || 'approved'}</span>
          </div>
        </div>
      </article>
    </Link>
  )
}
