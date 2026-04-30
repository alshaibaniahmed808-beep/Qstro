import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'QSTRO - سوق السيارات في ليبيا',
  description: 'منصة لبيع وشراء السيارات في ليبيا',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8 text-right">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
