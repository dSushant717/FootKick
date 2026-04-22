import { Truck, Clock, MapPin, Package, CheckCircle } from 'lucide-react'

const TIERS = [
  {
    name: 'Standard Shipping',
    price: '$9.99',
    time: '5 – 7 Business Days',
    note: 'Free on orders over $100',
    highlight: false,
  },
  {
    name: 'Express Shipping',
    price: '$19.99',
    time: '2 – 3 Business Days',
    note: 'Guaranteed by end of day',
    highlight: true,
  },
  {
    name: 'Overnight Shipping',
    price: '$34.99',
    time: 'Next Business Day',
    note: 'Order before 2 PM EST',
    highlight: false,
  },
]

const REGIONS = [
  { region: 'United States (Continental)', standard: '5 – 7 days', express: '2 – 3 days' },
  { region: 'Alaska & Hawaii',             standard: '7 – 10 days', express: '4 – 5 days' },
  { region: 'Canada',                      standard: '8 – 12 days', express: '5 – 7 days' },
  { region: 'Europe',                      standard: '10 – 14 days', express: '6 – 9 days' },
  { region: 'Rest of World',               standard: '14 – 21 days', express: '10 – 14 days' },
]

const STEPS = [
  { icon: Package,    title: 'Order Placed',     desc: 'You receive an order confirmation email immediately.' },
  { icon: CheckCircle,title: 'Order Processed',  desc: 'We pick and pack your gear within 1 business day.' },
  { icon: Truck,      title: 'Shipped',           desc: 'A tracking link is emailed to you once dispatched.' },
  { icon: MapPin,     title: 'Delivered',         desc: 'Your order arrives at your door.' },
]

export default function Shipping() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

      {/* Hero */}
      <div className="text-center mb-16">
        <p className="text-xs uppercase tracking-widest text-brand-500 font-semibold mb-3">Delivery Info</p>
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">Shipping Policy</h1>
        <p className="max-w-xl mx-auto text-surface-400 text-lg">
          Fast, reliable delivery on every order. Free standard shipping when you spend over $100.
        </p>
      </div>

      {/* Tiers */}
      <div className="grid md:grid-cols-3 gap-6 mb-16">
        {TIERS.map((t) => (
          <div
            key={t.name}
            className={`rounded-2xl border p-8 text-center transition-colors ${
              t.highlight
                ? 'bg-brand-500/10 border-brand-500/40'
                : 'bg-surface-900 border-surface-800 hover:border-surface-700'
            }`}
          >
            <Truck className={`w-8 h-8 mx-auto mb-4 ${t.highlight ? 'text-brand-400' : 'text-surface-500'}`} />
            <h3 className="text-lg font-bold mb-1">{t.name}</h3>
            <p className={`text-3xl font-extrabold mb-2 ${t.highlight ? 'text-brand-400' : ''}`}>{t.price}</p>
            <div className="flex items-center justify-center gap-1.5 text-sm text-surface-400 mb-3">
              <Clock className="w-4 h-4 shrink-0" />
              {t.time}
            </div>
            <p className="text-xs text-surface-500">{t.note}</p>
          </div>
        ))}
      </div>

      {/* How it works */}
      <div className="mb-16">
        <h2 className="text-2xl font-extrabold text-center mb-10">How Your Order Gets to You</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map(({ icon: Icon, title, desc }, i) => (
            <div key={title} className="relative">
              <div className="bg-surface-900 border border-surface-800 rounded-2xl p-6 text-center h-full">
                <div className="w-10 h-10 bg-brand-500/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-5 h-5 text-brand-500" />
                </div>
                <div className="text-xs font-bold text-brand-500 mb-1">Step {i + 1}</div>
                <h3 className="font-semibold mb-2">{title}</h3>
                <p className="text-sm text-surface-500">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Region table */}
      <div className="bg-surface-900 border border-surface-800 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-surface-800">
          <h2 className="text-lg font-bold">Estimated Delivery by Region</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-surface-800">
              <tr>
                <th className="text-left px-6 py-3 text-surface-400 font-medium">Region</th>
                <th className="text-left px-6 py-3 text-surface-400 font-medium">Standard</th>
                <th className="text-left px-6 py-3 text-surface-400 font-medium">Express</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-800">
              {REGIONS.map((r) => (
                <tr key={r.region} className="hover:bg-surface-800/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-surface-200">{r.region}</td>
                  <td className="px-6 py-4 text-surface-400">{r.standard}</td>
                  <td className="px-6 py-4 text-surface-400">{r.express}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
