'use client'
import { useState } from 'react'
import Image from 'next/image'

export default function ImageGallery({ images }) {
  const [selected, setSelected] = useState(0)
  if (!images || images.length === 0) return <div className="h-96 bg-gray-100 rounded-2xl animate-pulse" />
  return (
    <div className="space-y-4">
      <div className="relative h-[32rem] w-full rounded-2xl overflow-hidden shadow-lg">
        <Image src={images[selected]} alt="car" fill className="object-contain bg-gray-50" priority />
      </div>
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {images.map((src, idx) => (
            <button
              key={idx}
              onClick={() => setSelected(idx)}
              className={`relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all ${
                idx === selected ? 'border-primary-600 scale-105 shadow-md' : 'border-gray-200 opacity-70 hover:opacity-100'
              }`}
            >
              <Image src={src} alt="" fill className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
