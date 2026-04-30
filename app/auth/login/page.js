import { login } from '@/lib/actions'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Link from 'next/link'

export default function LoginPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">مرحباً بعودتك</h1>
          <p className="text-gray-500 mt-2">سجل الدخول إلى حسابك</p>
        </div>
        <div className="bg-white p-8 rounded-3xl shadow-2xl border border-gray-100">
          <form action={login}>
            <Input label="البريد الإلكتروني" name="email" type="email" required placeholder="you@example.com" />
            <Input label="كلمة المرور" name="password" type="password" required placeholder="••••••••" />
            <Button type="submit" className="w-full mt-4">تسجيل الدخول</Button>
          </form>
          <p className="mt-6 text-center text-sm text-gray-500">
            ليس لديك حساب؟ <Link href="/auth/register" className="text-primary-600 font-medium hover:underline">إنشاء حساب</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
