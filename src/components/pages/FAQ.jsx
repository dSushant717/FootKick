import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const FAQS = [
  {
    category: 'Orders',
    items: [
      {
        q: 'How do I track my order?',
        a: 'Once your order ships, you will receive an email with a tracking link. You can also log in to your account and view order status under "My Orders".',
      },
      {
        q: 'Can I change or cancel my order after placing it?',
        a: 'Orders can be modified or cancelled within 1 hour of being placed. After that, they enter our fulfilment pipeline and cannot be changed. Please contact support immediately if you need to make a change.',
      },
      {
        q: 'Do you offer gift wrapping?',
        a: 'Yes! Select the gift wrap option at checkout for $4.99. We will include a handwritten note if you provide one.',
      },
    ],
  },
  {
    category: 'Shipping',
    items: [
      {
        q: 'How long does standard shipping take?',
        a: 'Standard shipping within the continental US takes 5 – 7 business days. Express (2 – 3 days) and Overnight options are also available at checkout.',
      },
      {
        q: 'Do you ship internationally?',
        a: 'Yes, we ship to over 30 countries. International delivery typically takes 10 – 21 days depending on the destination. Import duties may apply.',
      },
      {
        q: 'When do I get free shipping?',
        a: 'All orders over $100 qualify for free standard shipping automatically — no coupon code required.',
      },
    ],
  },
  {
    category: 'Returns & Exchanges',
    items: [
      {
        q: 'What is your return policy?',
        a: 'We offer a 30-day return window from the date of delivery. Items must be unworn with original tags and packaging. We cover the return shipping cost.',
      },
      {
        q: 'How long does a refund take?',
        a: 'Once we receive and inspect the item (usually 1 – 2 days), your refund is issued within 3 – 5 business days to your original payment method.',
      },
      {
        q: 'Can I exchange a size?',
        a: 'Absolutely. Request an exchange the same way as a return — just note the size you want. If available, we will ship the replacement as soon as we receive your return.',
      },
    ],
  },
  {
    category: 'Products',
    items: [
      {
        q: 'Are your products authentic?',
        a: 'Yes. We source directly from official brand distributors and every product is verified before it reaches our warehouse. We do not carry replicas or counterfeits.',
      },
      {
        q: 'How do I find the right boot size?',
        a: 'Football boots generally fit half a size smaller than regular trainers. We recommend going up half a size. Each product page includes a detailed size guide.',
      },
      {
        q: 'Do you restock sold-out items?',
        a: 'Most items are restocked within 2 – 4 weeks. Use the "Notify Me" button on the product page and we will email you the moment it is back.',
      },
    ],
  },
]

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-surface-800 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left
                   hover:bg-surface-800/50 transition-colors"
      >
        <span className="font-medium text-surface-100 text-sm">{q}</span>
        <ChevronDown
          className={`w-4 h-4 text-surface-500 shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <div className="px-6 pb-5 text-sm text-surface-400 leading-relaxed border-t border-surface-800 pt-4">
          {a}
        </div>
      )}
    </div>
  )
}

export default function FAQ() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

      {/* Hero */}
      <div className="text-center mb-14">
        <p className="text-xs uppercase tracking-widest text-brand-500 font-semibold mb-3">Help Centre</p>
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">Frequently Asked Questions</h1>
        <p className="text-surface-400 text-lg">Everything you need to know about ordering from FootKick.</p>
      </div>

      {/* FAQ sections */}
      <div className="space-y-12">
        {FAQS.map(({ category, items }) => (
          <div key={category}>
            <h2 className="text-sm uppercase tracking-widest text-brand-500 font-semibold mb-4">{category}</h2>
            <div className="space-y-3">
              {items.map((item) => (
                <FAQItem key={item.q} {...item} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Still need help */}
      <div className="mt-14 bg-brand-500/10 border border-brand-500/20 rounded-2xl p-8 text-center">
        <h3 className="font-bold text-lg mb-2">Still Have Questions?</h3>
        <p className="text-surface-400 text-sm mb-4">Our support team is available Monday – Friday, 9 AM – 6 PM EST.</p>
        <p className="text-brand-400 font-medium">support@footkick.com</p>
      </div>
    </div>
  )
}
