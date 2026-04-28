'use client'
import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

export default function MessagesPage() {
  const { user } = useAuth()
  const [conversations, setConversations] = useState([])
  const supabase = createClient()

  useEffect(() => {
    if (!user) return
    async function load() {
      const { data: msgs } = await supabase.from('messages').select('*')
        .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`).order('created_at', { ascending: false })
      if (!msgs) return
      const groups = {}
      msgs.forEach(m => {
        const other = m.sender_id === user.id ? m.receiver_id : m.sender_id
        const key = `${m.car_id}-${other}`
        if (!groups[key]) groups[key] = { carId: m.car_id, userId: other, messages: [] }
        groups[key].messages.push(m)
      })
      const convData = await Promise.all(Object.values(groups).map(async (g) => {
        const [{ data: car }, { data: otherUser }] = await Promise.all([
          supabase.from('cars').select('title').eq('id', g.carId).single(),
          supabase.from('users').select('name').eq('id', g.userId).single()
        ])
        return { ...g, carTitle: car?.title || 'Unknown', otherUserName: otherUser?.name || 'Unknown', lastMessage: g.messages[0]?.message }
      }))
      setConversations(convData)
    }
    load()
  }, [user, supabase])

  if (!user) return <p className="text-center py-12">Please log in.</p>
  if (conversations.length === 0) return <p className="text-center py-20 text-gray-500">No conversations yet.</p>

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Messages</h1>
      <div className="space-y-4">
        {conversations.map(conv => (
          <Link key={`${conv.carId}-${conv.userId}`} href={`/messages/${conv.carId}/${conv.userId}`} className="block bg-white p-5 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
            <div className="flex justify-between">
              <span className="font-semibold text-gray-900">{conv.otherUserName} · {conv.carTitle}</span>
            </div>
            <p className="text-gray-600 mt-1 truncate">{conv.lastMessage}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
