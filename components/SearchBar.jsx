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

  const clearFilters = () => {
    setCity('')
    setMinPrice('')
    setMaxPrice('')
    router.push('/')
  }

  return (
    <form onSubmit={handleSearch} className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-6 md:p-8 border border-white/70 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
        <Input label="المدينة" value={city} onChange={e => setCity(e.target.value)} placeholder="طرابلس، بنغازي..." />
        <Input label="أقل سعر" type="number" value={minPrice} onChange={e => setMinPrice(e.target.value)} placeholder="0 LYD" />
        <Input label="أعلى سعر" type="number" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} placeholder="أي قيمة" />
        <Button type="submit" className="w-full py-3 text-base font-bold">🔍 بحث</Button>
        <Button type="button" variant="secondary" onClick={clearFilters} className="w-full py-3 text-base font-semibold">إعادة تعيين</Button>
      </div>
    </form>
  )
}
