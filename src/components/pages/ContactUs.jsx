import { useState } from 'react'
import { Mail, Phone, MapPin, Clock, Send, Check } from 'lucide-react'

const CONTACT_INFO = [
  {
    icon: Mail,
    title: 'Email Us',
    detail: 'support@footkick.com',
    sub: 'We reply within 24 hours',
  },
  {
    icon: Phone,
    title: 'Call Us',
    detail: '+1 (800) 365-5425',
    sub: 'Mon – Fri, 9 AM – 6 PM EST',
  },
  {
    icon: MapPin,
    title: 'Our Office',
    detail: '142 Striker Lane, Boston, MA',
    sub: 'United States',
  },
  {
    icon: Clock,
    title: 'Business Hours',
    detail: 'Mon – Fri: 9 AM – 6 PM',
    sub: 'Sat: 10 AM – 4 PM',
  },
]

export default function ContactUs() {
  const [form, setForm]       = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const inputCls =
    'w-full px-3 py-2.5 bg-surface-800 border border-surface-700 rounded-lg text-surface-100 ' +
    'placeholder-surface-600 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent'

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simulate form submission (no real backend)
    setSubmitted(true)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

      {/* Hero */}
      <div className="text-center mb-16">
        <p className="text-xs uppercase tracking-widest text-brand-500 font-semibold mb-3">Get in Touch</p>
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">Contact Us</h1>
        <p className="max-w-xl mx-auto text-surface-400 text-lg">
          Got a question about an order, a product, or just want to talk football?
          We are always happy to hear from you.
        </p>
      </div>

      {/* Contact cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
        {CONTACT_INFO.map(({ icon: Icon, title, detail, sub }) => (
          <div
            key={title}
            className="bg-surface-900 border border-surface-800 rounded-2xl p-6 text-center
                       hover:border-brand-500/40 transition-colors"
          >
            <div className="w-10 h-10 bg-brand-500/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Icon className="w-5 h-5 text-brand-500" />
            </div>
            <p className="text-sm font-semibold text-surface-200 mb-1">{title}</p>
            <p className="text-sm text-surface-300">{detail}</p>
            <p className="text-xs text-surface-500 mt-1">{sub}</p>
          </div>
        ))}
      </div>

      {/* Form */}
      <div className="max-w-2xl mx-auto">
        <div className="bg-surface-900 border border-surface-800 rounded-2xl p-8">
          <h2 className="text-xl font-bold mb-6">Send Us a Message</h2>

          {submitted ? (
            <div className="text-center py-10">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-brand-500 flex items-center justify-center
                              shadow-lg shadow-brand-500/40">
                <Check className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2">Message Sent!</h3>
              <p className="text-surface-400 text-sm">
                Thanks for reaching out, <span className="text-surface-200">{form.name}</span>.
                We will get back to you at <span className="text-surface-200">{form.email}</span> within 24 hours.
              </p>
              <button
                onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }) }}
                className="mt-6 text-sm text-brand-500 hover:text-brand-400 font-medium transition-colors"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-surface-300 mb-1.5">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="John Smith"
                    className={inputCls}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-surface-300 mb-1.5">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="john@example.com"
                    className={inputCls}
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-surface-300 mb-1.5">Subject</label>
                <select
                  className={inputCls}
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  required
                >
                  <option value="" disabled>Select a topic…</option>
                  <option value="order">Order / Shipping</option>
                  <option value="return">Returns & Exchanges</option>
                  <option value="product">Product Question</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-surface-300 mb-1.5">Message</label>
                <textarea
                  required
                  rows={5}
                  placeholder="Tell us how we can help…"
                  className={inputCls + ' resize-none'}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3 bg-brand-500 hover:bg-brand-600
                           text-white font-semibold rounded-xl transition-colors shadow-lg shadow-brand-500/30"
              >
                <Send className="w-4 h-4" />
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
