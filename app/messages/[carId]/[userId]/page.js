import ChatWindow from '@/components/ChatWindow'

export default function ChatPage({ params }) {
  return <ChatWindow carId={params.carId} otherUserId={params.userId} />
}
