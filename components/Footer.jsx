export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center"><span className="text-white font-bold">Q</span></div>
            <span className="text-xl font-extrabold text-primary-700">QSTRO</span>
          </div>
          <p className="text-gray-500 text-sm leading-relaxed">Libya's most trusted car marketplace. Buy, sell, and connect with dealers directly.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><a href="/" className="hover:text-primary-600 transition">Home</a></li>
            <li><a href="/cars/sell" className="hover:text-primary-600 transition">Sell Car</a></li>
            <li><a href="/subscription" className="hover:text-primary-600 transition">Dealer Plans</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Contact</h4>
          <p className="text-sm text-gray-600">Tripoli, Libya</p>
          <p className="text-sm text-gray-600">support@qstro.ly</p>
        </div>
      </div>
      <div className="border-t mt-8 pt-6 text-center text-sm text-gray-500">© {new Date().getFullYear()} QSTRO. All rights reserved.</div>
    </footer>
  )
}
