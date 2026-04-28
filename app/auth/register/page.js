import { signup } from '@/lib/actions'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Link from 'next/link'

export default function RegisterPage() {
  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">Create account</h1>
        <p className="text-gray-500 mt-2">Join QSTRO</p>
      </div>
      <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        <form action={signup}>
          <Input label="Full Name" name="name" required placeholder="Ahmed Alshaibani" />
          <Input label="Email" name="email" type="email" required placeholder="you@example.com" />
          <Input label="Password" name="password" type="password" required placeholder="Min. 6 characters" />
          <Button type="submit" className="w-full mt-4">Sign Up</Button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account? <Link href="/auth/login" className="text-primary-600 font-medium hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  )
}
