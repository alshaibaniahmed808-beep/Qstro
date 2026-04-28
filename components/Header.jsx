'use client'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import { useState, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'

export default function Header() {
  const { user, profile, signOut } = useAuth()
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <>
      <header className="glass sticky top-0 z-40">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">Q</span>
            </div>
            <span className="text-2xl font-extrabold text-primary-700">QSTRO</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">Home</Link>
            {user ? (
              <>
                <Link href="/cars/sell" className="text-gray-700 hover:text-primary-600 font-medium">Sell Car</Link>
                <Link href="/messages" className="text-gray-700 hover:text-primary-600 font-medium">Messages</Link>
                {profile?.role === 'dealer' && (
                  <Link href="/dashboard/dealer" className="text-gray-700 hover:text-primary-600 font-medium">Dashboard</Link>
                )}
                {profile?.role === 'admin' && (
                  <Link href="/dashboard/admin" className="text-gray-700 hover:text-primary-600 font-medium">Admin</Link>
                )}
                <div className="flex items-center gap-3 ml-4">
                  <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold">
                    {profile?.name?.charAt(0) || 'U'}
                  </div>
                  <button onClick={signOut} className="text-sm text-gray-500 hover:text-red-500 transition-colors">Logout</button>
                </div>
              </>
            ) : (
              <Link href="/auth/login" className="bg-primary-600 text-white px-5 py-2 rounded-full font-medium hover:bg-primary-700 transition-all shadow-md">
                Login / Register
              </Link>
            )}
          </nav>

          <button onClick={() => setDrawerOpen(true)} className="md:hidden p-2 rounded-lg hover:bg-gray-100" aria-label="Open menu">
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      <Transition.Root show={drawerOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={setDrawerOpen}>
          <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child as={Fragment} enter="transform transition ease-out duration-300" enterFrom="translate-x-full" enterTo="translate-x-0" leave="transform transition ease-in duration-200" leaveFrom="translate-x-0" leaveTo="translate-x-full">
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-sm">
                    <div className="flex h-full flex-col bg-white shadow-xl">
                      <div className="flex items-center justify-between px-6 py-4 border-b">
                        <span className="text-lg font-semibold text-primary-700">Menu</span>
                        <button onClick={() => setDrawerOpen(false)} className="p-2 rounded-md text-gray-500 hover:text-gray-700">✕</button>
                      </div>
                      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
                        {user ? (
                          <>
                            <div className="flex items-center gap-3 pb-4 border-b">
                              <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold text-lg">{profile?.name?.charAt(0) || 'U'}</div>
                              <div><p className="font-medium">{profile?.name || 'User'}</p><p className="text-xs text-gray-500 capitalize">{profile?.role}</p></div>
                            </div>
                            <nav className="space-y-2">
                              <Link href="/" className="block py-2 text-gray-700 hover:text-primary-600 font-medium" onClick={() => setDrawerOpen(false)}>🏠 Home</Link>
                              <Link href="/cars/sell" className="block py-2 text-gray-700 hover:text-primary-600 font-medium" onClick={() => setDrawerOpen(false)}>🚗 Sell Car</Link>
                              <Link href="/messages" className="block py-2 text-gray-700 hover:text-primary-600 font-medium" onClick={() => setDrawerOpen(false)}>💬 Messages</Link>
                              {profile?.role === 'dealer' && (
                                <Link href="/dashboard/dealer" className="block py-2 text-gray-700 hover:text-primary-600 font-medium" onClick={() => setDrawerOpen(false)}>📊 Dashboard</Link>
                              )}
                              {profile?.role === 'admin' && (
                                <Link href="/dashboard/admin" className="block py-2 text-gray-700 hover:text-primary-600 font-medium" onClick={() => setDrawerOpen(false)}>🛡️ Admin Panel</Link>
                              )}
                              <Link href="/subscription" className="block py-2 text-gray-700 hover:text-primary-600 font-medium" onClick={() => setDrawerOpen(false)}>⭐ Subscription</Link>
                            </nav>
                            <button onClick={() => { signOut(); setDrawerOpen(false); }} className="w-full text-left py-2 text-red-600 hover:text-red-800 font-medium">🚪 Logout</button>
                          </>
                        ) : (
                          <div className="space-y-4">
                            <p className="text-gray-500">Welcome! Please log in.</p>
                            <Link href="/auth/login" className="block text-center bg-primary-600 text-white py-3 rounded-xl font-semibold hover:bg-primary-700" onClick={() => setDrawerOpen(false)}>Login / Register</Link>
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
