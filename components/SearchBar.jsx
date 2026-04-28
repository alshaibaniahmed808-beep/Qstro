'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Input from './ui/Input'
import Button from './ui/Button'

export default function SearchBar() {
  const router = useRouter()
  const [city, setCity] = useState('')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')

  const handleSearch = (e) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (city) params.set('city', city)
    if (minPrice) params.set('minPrice', minPrice)
    if (maxPrice) params.set('maxPrice', maxPrice)
    router.push(`/?${params.toString()}`)
  }

  return (
    <form onSubmit={handleSearch} className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100 max-w-4xl mx-auto">
      <div className="flex flex-wrap gap-4 items-end">
        <div className="flex-1 min-w-[200px]">
          <Input label="City" value={city} onChange={e => setCity(e.target.value)} placeholder="e.g. Tripoli" />
        </div>
        <div className="flex-1 min-w-[150px]">
          <Input label="Min Price" type="number" value={minPrice} onChange={e => setMinPrice(e.target.value)} placeholder="0" />
        </div>
        <div className="flex-1 min-w-[150px]">
          <Input label="Max Price" type="number" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} placeholder="Any" />
        </div>
        <Button type="submit" className="w-full sm:w-auto px-8 py-3 text-base">🔍 Search</Button>
      </div>
    </form>
  )
}
