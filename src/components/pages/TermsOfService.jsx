const SECTIONS = [
  {
    title: '1. Acceptance of Terms',
    body: `By accessing or using the FootKick website you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use the site.`,
  },
  {
    title: '2. Eligibility',
    body: `You must be at least 16 years old to create an account or make a purchase. By using FootKick you represent that you meet this requirement.`,
  },
  {
    title: '3. Account Responsibility',
    body: `You are responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account. Notify us immediately at support@footkick.com if you suspect unauthorised access.`,
  },
  {
    title: '4. Purchases & Pricing',
    body: `All prices are listed in US Dollars and are subject to change without notice. We reserve the right to refuse or cancel any order at our discretion, including in cases of pricing errors. In such cases we will notify you and issue a full refund.`,
  },
  {
    title: '5. Intellectual Property',
    body: `All content on this site — including logos, images, product descriptions, and code — is the property of FootKick or its licensors. You may not reproduce, distribute, or create derivative works without our written consent.`,
  },
  {
    title: '6. Limitation of Liability',
    body: `FootKick is not liable for any indirect, incidental, or consequential damages arising from your use of the site or purchase of products. Our total liability in any dispute shall not exceed the amount paid for the order in question.`,
  },
  {
    title: '7. Governing Law',
    body: `These Terms are governed by the laws of the Commonwealth of Massachusetts, United States. Any disputes shall be resolved in the courts located in Boston, Massachusetts.`,
  },
  {
    title: '8. Changes to Terms',
    body: `We reserve the right to modify these Terms at any time. We will provide at least 14 days notice of material changes via email or a site banner. Continued use of FootKick after changes take effect constitutes acceptance.`,
  },
]

export default function TermsOfService() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

      <div className="text-center mb-12">
        <p className="text-xs uppercase tracking-widest text-brand-500 font-semibold mb-3">Legal</p>
        <h1 className="text-4xl font-extrabold mb-3">Terms of Service</h1>
        <p className="text-surface-500 text-sm">Last updated: January 1, 2024</p>
      </div>

      <div className="bg-surface-900 border border-surface-800 rounded-2xl p-8 mb-8">
        <p className="text-surface-400 leading-relaxed">
          Please read these Terms of Service carefully before using FootKick. They govern your access to and
          use of our website and services. These terms constitute a legally binding agreement between you and FootKick.
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
        Questions about these terms? Email us at{' '}
        <span className="text-brand-400">legal@footkick.com</span>
      </div>
    </div>
  )
}
