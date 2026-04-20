export default function Footer({ onNavigate }) {
  const shopLinks = [
    { id: 'jerseys',     label: 'Jerseys' },
    { id: 'boots',       label: 'Boots' },
    { id: 'balls',       label: 'Balls' },
    { id: 'accessories', label: 'Accessories' },
  ]

  return (
    <footer className="bg-surface-900 border-t border-surface-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-brand-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-black text-sm">FK</span>
              </div>
              <span className="text-base font-extrabold">FOOT<span className="text-brand-500">KICK</span></span>
            </div>
            <p className="text-sm text-surface-500">
              Premium football gear for players of all levels. Quality you can trust.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Shop</h3>
            <ul className="space-y-2">
              {shopLinks.map((l) => (
                <li key={l.id}>
                  <button
                    onClick={() => onNavigate(l.id)}
                    className="text-sm text-surface-500 hover:text-surface-100 transition-colors capitalize"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-surface-500">
              {['Contact Us', 'Shipping', 'Returns', 'FAQ'].map((l) => (
                <li key={l}><button className="hover:text-surface-100 transition-colors">{l}</button></li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-surface-500">
              {['About Us', 'Careers', 'Privacy Policy', 'Terms of Service'].map((l) => (
                <li key={l}><button className="hover:text-surface-100 transition-colors">{l}</button></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-surface-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-surface-600">&copy; 2024 FootKick. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span className="text-xs text-surface-600">Accepts:</span>
            {['VISA', 'MC', 'AMEX'].map((card) => (
              <div key={card} className="px-2 py-0.5 bg-surface-800 rounded text-xs font-semibold text-surface-400">
                {card}
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
