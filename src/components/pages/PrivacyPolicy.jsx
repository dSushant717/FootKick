const SECTIONS = [
  {
    title: '1. Information We Collect',
    body: `When you create an account or place an order we collect your name, email address, shipping address, and payment details. Payment card data is processed by our payment provider and never stored on our servers. We also collect browsing data (pages visited, products viewed, search queries) to improve your experience.`,
  },
  {
    title: '2. How We Use Your Information',
    body: `We use your information to process and fulfil orders, send transactional emails (order confirmations, shipping updates), respond to support requests, and improve our website and product catalogue. We do not sell your personal data to third parties.`,
  },
  {
    title: '3. Cookies',
    body: `FootKick uses cookies to keep your shopping cart active between sessions, remember your preferences, and gather anonymous analytics data through tools like Google Analytics. You can disable cookies in your browser settings, though some features of the site may not function correctly as a result.`,
  },
  {
    title: '4. Sharing Your Data',
    body: `We share data only with trusted service providers who help us run the business — including our payment processor, shipping carriers, and email platform. Each provider is bound by confidentiality agreements and may only use your data to perform services on our behalf.`,
  },
  {
    title: '5. Data Retention',
    body: `We retain your account and order data for 7 years to comply with financial regulations. You may request deletion of your account at any time by emailing privacy@footkick.com; order history required for tax or legal purposes will be retained in anonymised form.`,
  },
  {
    title: '6. Your Rights',
    body: `Depending on your location you may have the right to access, correct, or delete the personal data we hold about you. To exercise any of these rights, contact us at privacy@footkick.com. We will respond within 30 days.`,
  },
  {
    title: '7. Security',
    body: `All data is transmitted over HTTPS. Payment information is handled by PCI-DSS compliant processors. We conduct regular security reviews and limit staff access to personal data on a need-to-know basis.`,
  },
  {
    title: '8. Changes to This Policy',
    body: `We may update this Privacy Policy from time to time. Material changes will be communicated by email or a prominent notice on our website. Your continued use of FootKick after changes take effect constitutes acceptance of the revised policy.`,
  },
]

export default function PrivacyPolicy() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

      <div className="text-center mb-12">
        <p className="text-xs uppercase tracking-widest text-brand-500 font-semibold mb-3">Legal</p>
        <h1 className="text-4xl font-extrabold mb-3">Privacy Policy</h1>
        <p className="text-surface-500 text-sm">Last updated: January 1, 2024</p>
      </div>

      <div className="bg-surface-900 border border-surface-800 rounded-2xl p-8 mb-8">
        <p className="text-surface-400 leading-relaxed">
          FootKick ("we", "us", "our") is committed to protecting your personal information.
          This Privacy Policy explains what data we collect, how we use it, and your rights regarding that data.
          By using our website you agree to the practices described below.
        </p>
      </div>

      <div className="space-y-8">
        {SECTIONS.map(({ title, body }) => (
          <div key={title} className="bg-surface-900 border border-surface-800 rounded-2xl p-8">
            <h2 className="text-lg font-bold mb-4 text-surface-100">{title}</h2>
            <p className="text-surface-400 leading-relaxed text-sm">{body}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center text-sm text-surface-500">
        Questions? Contact us at{' '}
        <span className="text-brand-400">privacy@footkick.com</span>
      </div>
    </div>
  )
}
