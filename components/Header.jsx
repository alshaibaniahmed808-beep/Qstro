'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useAuth } from '@/hooks/useAuth'
import { useState, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'

export default function Header() {
  const { user, profile, signOut } = useAuth()
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <>
      <header className="glass sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl overflow-hidden shadow-lg shadow-primary-200 bg-gray-900">
              <Image src="/logo.svg" alt="شعار QSTRO" width={40} height={40} priority />
            </div>
            <span className="text-2xl font-black text-primary-700 tracking-tight">QSTRO</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="font-medium text-gray-600 hover:text-primary-600 transition">الرئيسية</Link>
            {user ? (
              <>
                <Link href="/cars/sell" className="font-medium text-gray-600 hover:text-primary-600 transition">بيع سيارة</Link>
                <Link href="/messages" className="font-medium text-gray-600 hover:text-primary-600 transition">الرسائل</Link>
                {profile?.role === 'dealer' && <Link href="/dashboard/dealer" className="font-medium text-gray-600 hover:text-primary-600 transition">لوحة التاجر</Link>}
                {profile?.role === 'admin' && <Link href="/dashboard/admin" className="font-medium text-gray-600 hover:text-primary-600 transition">الإدارة</Link>}
                <div className="flex items-center gap-3 ml-4">
                  <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-sm">{profile?.name?.charAt(0)}</div>
                  <button onClick={signOut} className="text-sm text-gray-400 hover:text-red-500 transition">تسجيل الخروج</button>
                </div>
              </>
            ) : (
              <Link href="/auth/login" className="bg-primary-600 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-primary-700 shadow-md transition">دخول</Link>
            )}
          </nav>

          <button onClick={() => setDrawerOpen(true)} className="md:hidden p-2 rounded-lg hover:bg-gray-100">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
        </div>
      </header>

      <Transition.Root show={drawerOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={setDrawerOpen}>
          <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child as={Fragment} enter="transform transition ease-out duration-300" enterFrom="translate-x-full" enterTo="translate-x-0" leave="transform transition ease-in duration-200" leaveFrom="translate-x-0" leaveTo="translate-x-full">
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-xs">
                    <div className="flex h-full flex-col bg-white shadow-2xl">
                      <div className="flex items-center justify-between px-5 py-4 border-b">
                        <span className="text-lg font-bold text-primary-700">القائمة</span>
                        <button onClick={() => setDrawerOpen(false)} className="p-2 rounded-md text-gray-500 hover:bg-gray-100">✕</button>
                      </div>
                      <div className="flex-1 overflow-y-auto px-5 py-6 space-y-6">
                        {user ? (
                          <>
                            <div className="flex items-center gap-4 pb-4 border-b">
                              <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold text-lg">{profile?.name?.charAt(0)}</div>
                              <div><p className="font-medium">{profile?.name}</p><p className="text-xs text-gray-500 capitalize">{profile?.role}</p></div>
                            </div>
                            <nav className="space-y-3">
                              <Link href="/" className="block py-2 text-gray-700 hover:text-primary-600 font-medium" onClick={()=>setDrawerOpen(false)}>🏠 الرئيسية</Link>
                              <Link href="/cars/sell" className="block py-2 text-gray-700 hover:text-primary-600 font-medium" onClick={()=>setDrawerOpen(false)}>🚗 بيع سيارة</Link>
                              <Link href="/messages" className="block py-2 text-gray-700 hover:text-primary-600 font-medium" onClick={()=>setDrawerOpen(false)}>💬 الرسائل</Link>
                              {profile?.role === 'dealer' && <Link href="/dashboard/dealer" className="block py-2 text-gray-700 hover:text-primary-600 font-medium" onClick={()=>setDrawerOpen(false)}>📊 لوحة التاجر</Link>}
                              {profile?.role === 'admin' && <Link href="/dashboard/admin" className="block py-2 text-gray-700 hover:text-primary-600 font-medium" onClick={()=>setDrawerOpen(false)}>🛡️ الإدارة</Link>}
                              <Link href="/subscription" className="block py-2 text-gray-700 hover:text-primary-600 font-medium" onClick={()=>setDrawerOpen(false)}>⭐ الباقات</Link>
                            </nav>
                            <button onClick={()=>{signOut();setDrawerOpen(false)}} className="w-full text-left py-2 text-red-600 font-medium">🚪 تسجيل الخروج</button>
                          </>
                        ) : (
                          <div className="space-y-4">
                            <p className="text-gray-500">يرجى تسجيل الدخول للمتابعة.</p>
                            <Link href="/auth/login" className="block text-center bg-primary-600 text-white py-3 rounded-xl font-semibold" onClick={()=>setDrawerOpen(false)}>دخول / إنشاء حساب</Link>
                          </div>
                        )}
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  )
}
