import { login } from '@/lib/actions'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Link from 'next/link'

export default function LoginPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">Welcome back</h1>
          <p className="text-gray-500 mt-2">Log in to your account</p>
        </div>
        <div className="bg-white p-8 rounded-3xl shadow-2xl border border-gray-100">
          <form action={login}>
            <Input label="Email" name="email" type="email" required placeholder="you@example.com" />
            <Input label="Password" name="password" type="password" required placeholder="••••••••" />
            <Button type="submit" className="w-full mt-4">Log In</Button>
          </form>
          <p className="mt-6 text-center text-sm text-gray-500">
            Don't have an account? <Link href="/auth/register" className="text-primary-600 font-medium hover:underline">Register</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
