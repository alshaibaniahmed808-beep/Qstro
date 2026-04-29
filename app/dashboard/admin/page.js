import { createClient } from '@/lib/supabase/server'
import { approveCar, approvePayment } from '@/lib/actions'
import Button from '@/components/ui/Button'

export default async function AdminDashboard() {
  const supabase = createClient()
  const { data: pendingCars } = await supabase.from('cars').select('*, users(name)').eq('status', 'pending')
  const { data: payments } = await supabase.from('payments').select('*, users(name)').eq('status', 'pending')
  const { data: users } = await supabase.from('users').select('*')

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      <h1 className="text-3xl font-extrabold">Admin Panel</h1>

      <section>
        <h2 className="text-xl font-bold mb-4">Pending Cars</h2>
        <div className="bg-white rounded-2xl shadow-sm border overflow-x-auto">
          <table className="w-full text-sm"><thead className="bg-gray-50"><tr><th className="p-3 text-left">Title</th><th>Owner</th><th>Action</th></tr></thead>
            <tbody>{pendingCars?.map(car => (<tr key={car.id} className="border-t"><td className="p-3">{car.title}</td><td>{car.users?.name}</td><td><form action={approveCar.bind(null, car.id)}><Button type="submit">Approve</Button></form></td></tr>))}</tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4">Pending Payments</h2>
        <div className="bg-white rounded-2xl shadow-sm border overflow-x-auto">
          <table className="w-full text-sm"><thead className="bg-gray-50"><tr><th>User</th><th>Amount</th><th>Proof</th><th>Action</th></tr></thead>
            <tbody>{payments?.map(p => (<tr key={p.id} className="border-t"><td className="p-3">{p.users?.name}</td><td>${p.amount}</td><td><a href={p.proof_image} target="_blank" className="text-primary-600 underline">View</a></td><td><form action={approvePayment.bind(null, p.id)}><Button type="submit">Approve</Button></form></td></tr>))}</tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4">Users</h2>
        <div className="bg-white rounded-2xl shadow-sm border overflow-x-auto">
          <table className="w-full text-sm"><thead className="bg-gray-50"><tr><th>Name</th><th>Email</th><th>Role</th></tr></thead>
            <tbody>{users?.map(u => (<tr key={u.id} className="border-t"><td className="p-3">{u.name}</td><td>{u.email || '—'}</td><td className="capitalize">{u.role}</td></tr>))}</tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
