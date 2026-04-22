import { RotateCcw, CheckCircle, XCircle, Clock, Mail } from 'lucide-react'

const ACCEPTED = [
  'Unworn items in original packaging',
  'Items with all tags still attached',
  'Faulty or damaged goods (any condition)',
  'Wrong item received',
  'Items returned within 30 days of delivery',
]

const NOT_ACCEPTED = [
  'Worn, washed, or altered items',
  'Items without original tags or packaging',
  'Customised or personalised products',
  'Items returned after 30 days',
  'Sale items marked as final sale',
]

const STEPS = [
  {
    step: '01',
    title: 'Contact Support',
    desc: 'Email us at returns@footkick.com with your order number and reason for return.',
  },
  {
    step: '02',
    title: 'Get Your Label',
    desc: 'We will email you a prepaid return shipping label within 1 business day.',
  },
  {
    step: '03',
    title: 'Pack & Drop Off',
    desc: 'Pack the item securely and drop it at any authorised shipping location.',
  },
  {
    step: '04',
    title: 'Refund Issued',
    desc: 'Once received and inspected, your refund is processed within 3 – 5 business days.',
  },
]

export default function Returns() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

      {/* Hero */}
      <div className="text-center mb-16">
        <p className="text-xs uppercase tracking-widest text-brand-500 font-semibold mb-3">Hassle-Free</p>
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">Returns & Exchanges</h1>
        <p className="max-w-xl mx-auto text-surface-400 text-lg">
          Not quite right? We offer a simple 30-day return policy with free return shipping on all eligible orders.
        </p>
      </div>

      {/* Policy highlight */}
      <div className="grid sm:grid-cols-3 gap-4 mb-16">
        {[
          { icon: RotateCcw, label: '30-Day Returns',      sub: 'From date of delivery' },
          { icon: Clock,     label: '3-5 Day Refunds',     sub: 'After item is received' },
          { icon: Mail,      label: 'Free Return Label',   sub: 'Emailed within 24 hours' },
        ].map(({ icon: Icon, label, sub }) => (
          <div key={label} className="bg-surface-900 border border-surface-800 rounded-2xl p-6 text-center hover:border-brand-500/40 transition-colors">
            <Icon className="w-6 h-6 text-brand-500 mx-auto mb-3" />
            <p className="font-semibold">{label}</p>
            <p className="text-sm text-surface-500 mt-1">{sub}</p>
          </div>
        ))}
      </div>

      {/* Steps */}
      <div className="mb-16">
        <h2 className="text-2xl font-extrabold text-center mb-10">How to Return an Item</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map(({ step, title, desc }) => (
            <div key={step} className="bg-surface-900 border border-surface-800 rounded-2xl p-6">
              <div className="text-3xl font-extrabold text-brand-500/30 mb-3">{step}</div>
              <h3 className="font-semibold mb-2">{title}</h3>
              <p className="text-sm text-surface-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Accepted / Not accepted */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-surface-900 border border-surface-800 rounded-2xl p-8">
          <div className="flex items-center gap-2 mb-6">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <h3 className="font-bold text-lg">We Accept Returns For</h3>
          </div>
          <ul className="space-y-3">
            {ACCEPTED.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-surface-400">
                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-surface-900 border border-surface-800 rounded-2xl p-8">
          <div className="flex items-center gap-2 mb-6">
            <XCircle className="w-5 h-5 text-red-400" />
            <h3 className="font-bold text-lg">We Cannot Accept</h3>
          </div>
          <ul className="space-y-3">
            {NOT_ACCEPTED.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-surface-400">
                <XCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
