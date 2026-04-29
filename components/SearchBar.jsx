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
    <form onSubmit={handleSearch} className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-6 md:p-8 border border-white/50 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
        <div>
          <Input label="City" value={city} onChange={e => setCity(e.target.value)} placeholder="Any city" />
        </div>
        <div>
          <Input label="Min Price" type="number" value={minPrice} onChange={e => setMinPrice(e.target.value)} placeholder="0 LYD" />
        </div>
        <div>
          <Input label="Max Price" type="number" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} placeholder="Any" />
        </div>
        <Button type="submit" className="w-full py-3 text-base font-bold">🔍 Search</Button>
      </div>
    </form>
  )
}
