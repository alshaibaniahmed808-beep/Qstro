'use client'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'

export default function ChatSellerButton({ carId, sellerId }) {
  const { user } = useAuth()
  const router = useRouter()

  const handleChat = () => {
    if (!user) { router.push('/auth/login'); return }
    router.push(`/messages/${carId}/${sellerId}`)
  }

  return <Button onClick={handleChat} variant="primary">Chat with Seller</Button>
}
