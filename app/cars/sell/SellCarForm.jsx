'use client'
import { useState } from 'react'
import { createCar } from '@/lib/actions'
import { createClient } from '@/lib/supabase/client'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'

export default function SellCarForm() {
  const [images, setالصور] = useState([])
  const [uploading, setUploading] = useState(false)

  async function handleUpload() {
    if (!images.length) return []
    const supabase = createClient()
    const urls = []
    for (const file of images) {
      const filename = `${Date.now()}-${file.name}`
      const { error } = await supabase.storage.from('car-images').upload(`public/${filename}`, file)
      if (error) throw error
      urls.push(supabase.storage.from('car-images').getPublicUrl(`public/${filename}`).data.publicUrl)
    }
    return urls
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setUploading(true)
    try {
      const imageUrls = await handleUpload()
      const formData = new FormData(e.target)
      await createCar(formData, imageUrls)
    } catch (err) {
      alert('Error: ' + err.message)
    } finally {
      setUploading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white p-8 rounded-3xl shadow-2xl border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">🚗 أضف سيارتك للبيع</h2>
      <Input label="العنوان" name="title" required placeholder="e.g. Toyota Corolla 2020" />
      <Input label="السعر (دينار)" name="price" type="number" required placeholder="45000" />
      <Input label="المدينة" name="city" required placeholder="Tripoli" />
      <Input label="الوصف" name="description" required placeholder="Condition, mileage, service history..." />
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-1.5">الصور</label>
        <input type="file" multiple accept="image/*" onChange={e => setالصور([...e.target.files])} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100" />
        {images.length > 0 && <p className="text-xs text-gray-500 mt-1">{images.length} صورة/صور محددة</p>}
      </div>
      <Button type="submit" disabled={uploading} className="w-full mt-4">{uploading ? 'جاري الرفع...' : 'إرسال للمراجعة'}</Button>
    </form>
  )
}
