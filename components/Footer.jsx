export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center"><span className="text-white font-bold">Q</span></div>
            <span className="text-xl font-extrabold text-primary-700">QSTRO</span>
          </div>
          <p className="text-gray-500 text-sm leading-relaxed">منصة QSTRO لبيع وشراء السيارات في ليبيا بطريقة آمنة وسريعة.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-4">روابط سريعة</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><a href="/" className="hover:text-primary-600 transition">الرئيسية</a></li>
            <li><a href="/cars/sell" className="hover:text-primary-600 transition">بيع سيارة</a></li>
            <li><a href="/subscription" className="hover:text-primary-600 transition">باقات التجار</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">تواصل معنا</h4>
          <p className="text-sm text-gray-600">طرابلس، ليبيا</p>
          <p className="text-sm text-gray-600">support@qstro.ly</p>
        </div>
      </div>
      <div className="border-t mt-8 pt-6 text-center text-sm text-gray-500">© {new Date().getFullYear()} QSTRO. جميع الحقوق محفوظة.</div>
    </footer>
  )
}
