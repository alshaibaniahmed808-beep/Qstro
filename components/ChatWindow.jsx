'use client'
import { useEffect, useState, useRef } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { createClient } from '@/lib/supabase/client'
import Button from './ui/Button'

export default function ChatWindow({ carId, otherUserId }) {
  const { user } = useAuth()
  const supabase = createClient()
  const [messages, setMessages] = useState([])
  const [newMsg, setNewMsg] = useState('')
  const bottomRef = useRef(null)
  const [otherUser, setOtherUser] = useState(null)
  const [car, setCar] = useState(null)

  useEffect(() => {
    if (!user) return
    async function init() {
      const [{ data: msgs }, { data: usr }, { data: veh }] = await Promise.all([
        supabase.from('messages').select('*').eq('car_id', carId).or(`and(sender_id.eq.${user.id},receiver_id.eq.${otherUserId}),and(sender_id.eq.${otherUserId},receiver_id.eq.${user.id})`).order('created_at', { ascending: true }),
        supabase.from('users').select('id, name').eq('id', otherUserId).single(),
        supabase.from('cars').select('title').eq('id', carId).single()
      ])
      setMessages(msgs || [])
      setOtherUser(usr)
      setCar(veh)
    }
    init()
    const channel = supabase.channel(`chat-${carId}`).on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages', filter: `car_id=eq.${carId}` }, payload => setMessages(prev => [...prev, payload.new])).subscribe()
    return () => { supabase.removeChannel(channel) }
  }, [carId, otherUserId, user, supabase])

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])

  const sendMessage = async () => {
    if (!newMsg.trim()) return
    const { error } = await supabase.from('messages').insert({ car_id: carId, sender_id: user.id, receiver_id: otherUserId, message: newMsg.trim() })
    if (!error) setNewMsg('')
  }

  if (!user) return <div className="text-center py-20 text-gray-400">Please log in to chat.</div>

  return (
    <div className="flex flex-col h-[85vh] max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
      <div className="p-5 border-b bg-primary-50 flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-primary-200 text-primary-700 flex items-center justify-center font-bold">{otherUser?.name?.charAt(0) || '?'}</div>
        <div>
          <h2 className="font-bold text-gray-900">{otherUser?.name || '...'}</h2>
          <p className="text-xs text-gray-500">Re: {car?.title || '...'}</p>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50/30">
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.sender_id === user.id ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[75%] rounded-2xl px-5 py-3 text-sm ${msg.sender_id === user.id ? 'bg-primary-600 text-white rounded-br-md' : 'bg-white border border-gray-200 text-gray-800 rounded-bl-md shadow-sm'}`}>
              {msg.message}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <div className="p-4 border-t bg-white flex gap-3 items-center">
        <input className="flex-1 border border-gray-200 rounded-full px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="Type a message..." value={newMsg} onChange={e => setNewMsg(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMessage()} />
        <Button onClick={sendMessage} className="rounded-full px-6">Send</Button>
      </div>
    </div>
  )
}
