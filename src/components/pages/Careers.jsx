import { MapPin, Clock, ArrowRight, Heart, Zap, Users, Coffee } from 'lucide-react'

const PERKS = [
  { icon: Heart,   title: 'Health & Wellness',   desc: 'Full medical, dental, and vision coverage from day one.' },
  { icon: Zap,     title: 'Gear Allowance',       desc: '$500 annual credit to spend on anything in the FootKick store.' },
  { icon: Users,   title: 'Great Team',           desc: 'Work alongside passionate footballers and tech enthusiasts.' },
  { icon: Coffee,  title: 'Flexible Hours',       desc: 'Remote-friendly roles with flexible start times.' },
]

const JOBS = [
  {
    title: 'Senior Frontend Engineer',
    dept: 'Engineering',
    location: 'Boston, MA / Remote',
    type: 'Full-time',
    desc: 'Own the customer-facing React application and help us build new shopping experiences.',
  },
  {
    title: 'Gear Buyer & Product Curator',
    dept: 'Merchandising',
    location: 'Boston, MA',
    type: 'Full-time',
    desc: 'Source and evaluate new football products, build relationships with top brands.',
  },
  {
    title: 'Customer Support Specialist',
    dept: 'Support',
    location: 'Remote',
    type: 'Full-time',
    desc: 'Be the first point of contact for our customers — resolve issues quickly and with care.',
  },
  {
    title: 'Digital Marketing Manager',
    dept: 'Marketing',
    location: 'Boston, MA / Hybrid',
    type: 'Full-time',
    desc: 'Drive growth through paid social, email campaigns, and influencer partnerships.',
  },
  {
    title: 'Warehouse Associate',
    dept: 'Operations',
    location: 'Boston, MA',
    type: 'Part-time',
    desc: 'Pick, pack, and ship orders accurately and efficiently in our fast-moving fulfilment centre.',
  },
]

export default function Careers() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

      {/* Hero */}
      <div className="text-center mb-16">
        <p className="text-xs uppercase tracking-widest text-brand-500 font-semibold mb-3">Join the Team</p>
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">Work at FootKick</h1>
        <p className="max-w-xl mx-auto text-surface-400 text-lg">
          We are a team of football lovers building the best place to buy football gear online.
          If that sounds like your kind of challenge, we want to hear from you.
        </p>
      </div>

      {/* Perks */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
        {PERKS.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="bg-surface-900 border border-surface-800 rounded-2xl p-6 hover:border-brand-500/40 transition-colors">
            <div className="w-10 h-10 bg-brand-500/10 rounded-xl flex items-center justify-center mb-4">
              <Icon className="w-5 h-5 text-brand-500" />
            </div>
            <h3 className="font-semibold mb-2">{title}</h3>
            <p className="text-sm text-surface-500 leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

      {/* Open roles */}
      <div>
        <h2 className="text-2xl font-extrabold mb-8">Open Positions</h2>
        <div className="space-y-4">
          {JOBS.map((job) => (
            <div
              key={job.title}
              className="group bg-surface-900 border border-surface-800 rounded-2xl p-6
                         hover:border-brand-500/40 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-xs font-semibold px-2.5 py-0.5 bg-brand-500/10 text-brand-400 rounded-full">
                      {job.dept}
                    </span>
                    <span className="text-xs font-medium px-2.5 py-0.5 bg-surface-800 text-surface-400 rounded-full">
                      {job.type}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold mb-1 group-hover:text-brand-400 transition-colors">{job.title}</h3>
                  <div className="flex items-center gap-1.5 text-sm text-surface-500 mb-3">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    {job.location}
                  </div>
                  <p className="text-sm text-surface-400">{job.desc}</p>
                </div>
                <button
                  className="flex items-center gap-2 px-5 py-2.5 bg-brand-500 hover:bg-brand-600
                             text-white text-sm font-semibold rounded-xl transition-colors shrink-0"
                >
                  Apply
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* No role */}
      <div className="mt-12 bg-surface-900 border border-surface-800 rounded-2xl p-8 text-center">
        <h3 className="font-bold text-lg mb-2">Don&apos;t See the Right Role?</h3>
        <p className="text-surface-400 text-sm mb-4">
          We are always on the lookout for talented people. Send your CV to{' '}
          <span className="text-brand-400">careers@footkick.com</span> and we will keep you on file.
        </p>
      </div>
    </div>
  )
}
