import { signup } from '@/lib/actions'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Link from 'next/link'

export default function RegisterPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">إنشاء حساب</h1>
          <p className="text-gray-500 mt-2">انضم إلى QSTRO اليوم</p>
        </div>
        <div className="bg-white p-8 rounded-3xl shadow-2xl border border-gray-100">
          <form action={signup}>
            <Input label="الاسم الكامل" name="name" required placeholder="Ahmed Alshaibani" />
            <Input label="البريد الإلكتروني" name="email" type="email" required placeholder="you@example.com" />
            <Input label="كلمة المرور" name="password" type="password" required placeholder="6 أحرف على الأقل" />
            <Button type="submit" className="w-full mt-4">تسجيل حساب</Button>
          </form>
          <p className="mt-6 text-center text-sm text-gray-500">
            لديك حساب بالفعل؟ <Link href="/auth/login" className="text-primary-600 font-medium hover:underline">دخول</Link>
          </p>
        </div>
      </div>
    </div>
  )
    }
