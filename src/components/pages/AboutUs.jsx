import { Shield, Truck, RotateCcw, Star, Users, Trophy, Globe } from 'lucide-react'

const STATS = [
  { icon: Users,  value: '50,000+', label: 'Happy Customers' },
  { icon: Trophy, value: '12 Years', label: 'In the Game' },
  { icon: Globe,  value: '30+',     label: 'Countries Served' },
  { icon: Star,   value: '4.8 / 5', label: 'Average Rating' },
]

const TEAM = [
  { name: 'Sushant Dahal',  role: 'Founder & CEO',        initials: 'SD' },
  { name: 'Diksha Karki',   role: 'Head of Product',      initials: 'DK' },
  { name: 'Nitish Baidya',  role: 'Lead Gear Curator',    initials: 'NB' },
  { name: 'Amitaya Lama',   role: 'Customer Experience',  initials: 'AL' },
]

const VALUES = [
  {
    icon: Shield,
    title: 'Quality First',
    desc: 'Every product is tested by real players before it hits our shelves. If it does not perform on the pitch, it does not make the cut.',
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    desc: 'Orders placed before 2 PM ship the same day. Free shipping on all orders over $100 — no code needed.',
  },
  {
    icon: RotateCcw,
    title: '30-Day Returns',
    desc: 'Not the right fit? Return or exchange any item within 30 days, no questions asked.',
  },
]

export default function AboutUs({ onNavigate }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

      {/* Hero */}
      <div className="text-center mb-20">
        <p className="text-xs uppercase tracking-widest text-brand-500 font-semibold mb-3">Our Story</p>
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 leading-tight">
          Built by Players,<br />
          <span className="text-brand-500">For Players</span>
        </h1>
        <p className="max-w-2xl mx-auto text-surface-400 text-lg leading-relaxed">
          FootKick was founded in 2012 by a group of semi-professional footballers who were tired of
          overpriced gear and slow shipping. We set out to build the store we always wished existed —
          premium equipment, honest prices, and a team that actually understands the game.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
        {STATS.map(({ icon: Icon, value, label }) => (
          <div
            key={label}
            className="bg-surface-900 border border-surface-800 rounded-2xl p-6 text-center
                       hover:border-brand-500/40 transition-colors"
          >
            <Icon className="w-6 h-6 text-brand-500 mx-auto mb-3" />
            <p className="text-2xl font-extrabold mb-1">{value}</p>
            <p className="text-sm text-surface-500">{label}</p>
          </div>
        ))}
      </div>

      {/* Values */}
      <div className="mb-20">
        <h2 className="text-2xl font-extrabold text-center mb-10">What We Stand For</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {VALUES.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="bg-surface-900 border border-surface-800 rounded-2xl p-8
                         hover:border-brand-500/40 transition-colors"
            >
              <div className="w-12 h-12 bg-brand-500/10 rounded-xl flex items-center justify-center mb-5">
                <Icon className="w-6 h-6 text-brand-500" />
              </div>
              <h3 className="text-lg font-bold mb-3">{title}</h3>
              <p className="text-surface-400 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team */}
      <div className="mb-20">
        <h2 className="text-2xl font-extrabold text-center mb-10">Meet the Team</h2>
        <div className="flex flex-wrap justify-center gap-10">
          {TEAM.map(({ name, role, initials }) => (
            <div key={name} className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-brand-500/20 border border-brand-500/30
                              flex items-center justify-center shrink-0">
                <span className="text-sm font-extrabold text-brand-400">{initials}</span>
              </div>
              <div>
                <p className="font-semibold text-surface-100 text-sm">{name}</p>
                <p className="text-xs text-surface-500">{role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-brand-500/10 border border-brand-500/20 rounded-2xl p-10 text-center">
        <h2 className="text-2xl font-extrabold mb-3">Ready to Gear Up?</h2>
        <p className="text-surface-400 mb-6">Browse our full range of professional football equipment.</p>
        <button
          onClick={() => onNavigate('products')}
          className="px-8 py-3 bg-brand-500 hover:bg-brand-600 text-white font-semibold
                     rounded-xl transition-colors shadow-lg shadow-brand-500/30"
        >
          Shop Now
        </button>
      </div>
    </div>
  )
}
