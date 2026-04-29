'use client'
import { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { createClient } from '@/lib/supabase/client'
import Button from '@/components/ui/Button'

const plans = [
  { name: 'Starter', price: 20, features: ['5 listings', 'Basic support', 'Standard visibility'] },
  { name: 'Pro', price: 40, popular: true, features: ['20 listings', 'Priority support', 'Featured badge on listings'] },
  { name: 'Premium', price: 80, features: ['Unlimited listings', 'Dedicated agent', 'Top placement & featured'] },
]

export default function SubscriptionPage() {
  const { user } = useAuth()
  const [selectedPlan, setSelectedPlan] = useState(plans[1])
  const [proofFile, setProofFile] = useState(null)
  const [uploading, setUploading] = useState(false)

  async function handlePurchase() {
    if (!proofFile) return alert('Upload payment proof')
    setUploading(true)
    const supabase = createClient()
    try {
      const fileName = `${Date.now()}-${proofFile.name}`
      const { error: uploadError } = await supabase.storage.from('payment-proofs').upload(`proofs/${fileName}`, proofFile)
      if (uploadError) throw uploadError
      const proofUrl = supabase.storage.from('payment-proofs').getPublicUrl(`proofs/${fileName}`).data.publicUrl
      const { error } = await supabase.from('payments').insert({ user_id: user.id, amount: selectedPlan.price, proof_image: proofUrl, status: 'pending' })
      if (error) throw error
      alert('Payment proof submitted.')
    } catch (err) { alert('Error: ' + err.message) } finally { setUploading(false) }
  }

  return (
    <div className="max-w-5xl mx-auto px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-black text-gray-900">Dealer Plans</h1>
        <p className="text-gray-500 mt-2">Choose the best plan for your dealership</p>
      </div>
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        {plans.map(plan => (
          <div key={plan.name} onClick={() => setSelectedPlan(plan)} className={`cursor-pointer rounded-2xl p-6 border-2 transition-all ${selectedPlan.name === plan.name ? 'border-primary-600 bg-primary-50 shadow-lg' : 'border-gray-200 hover:border-primary-300'}`}>
            {plan.popular && <span className="bg-primary-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-2 inline-block">Most Popular</span>}
            <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
            <p className="text-3xl font-extrabold text-primary-600 mt-2">${plan.price}<span className="text-sm font-normal text-gray-500">/mo</span></p>
            <ul className="mt-4 space-y-2 text-sm text-gray-600">{plan.features.map(f => <li key={f}>✅ {f}</li>)}</ul>
          </div>
        ))}
      </div>
      <div className="bg-white p-6 rounded-2xl shadow border">
        <p className="font-medium mb-4">Upload payment proof (screenshot)</p>
        <input type="file" accept="image/*" onChange={e => setProofFile(e.target.files[0])} className="mb-4" />
        <Button onClick={handlePurchase} disabled={uploading} className="w-full md:w-auto">{uploading ? 'Submitting...' : `Submit Payment ($${selectedPlan.price})`}</Button>
      </div>
    </div>
  )
  }
