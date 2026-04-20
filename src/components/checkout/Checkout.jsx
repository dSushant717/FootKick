import { useState } from 'react'
import { ArrowLeft, Check, Truck, CreditCard, Lock, ShoppingBag } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../../store/hooks.js'
import { clearCart } from '../../store/slices/cartSlice.js'
import { useCart } from '../../hooks/useCart.js'

export default function Checkout({ onBack, onComplete }) {
  const dispatch  = useAppDispatch()
  const { user }  = useAppSelector((s) => s.auth)
  const { items, subtotal, shipping, tax, total } = useCart()

  const [step,          setStep]          = useState(1)
  const [isProcessing,  setIsProcessing]  = useState(false)
  const [orderDone,     setOrderDone]     = useState(false)

  const [shipping_, setShipping_] = useState({
    firstName: user?.name?.split(' ')[0] ?? '',
    lastName:  user?.name?.split(' ')[1] ?? '',
    email:     user?.email ?? '',
    address: '', city: '', state: '', zip: '', phone: '',
  })

  const [payment, setPayment] = useState({
    cardNumber: '', expiry: '', cvv: '', nameOnCard: '',
  })

  const handleShippingSubmit = (e) => {
    e.preventDefault()
    setStep(2)
  }

  const handlePaymentSubmit = async (e) => {
    e.preventDefault()
    setIsProcessing(true)
    await new Promise((r) => setTimeout(r, 1800))
    dispatch(clearCart())
    setIsProcessing(false)
    setOrderDone(true)
  }

  const inputCls =
    'w-full px-3 py-2.5 bg-surface-800 border border-surface-700 rounded-lg text-surface-100 ' +
    'placeholder-surface-600 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent'

  const labelCls = 'block text-sm font-medium text-surface-300 mb-1.5'

  /* ── Order confirmed ── */
  if (orderDone) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-brand-500 flex items-center justify-center shadow-xl shadow-brand-500/40">
          <Check className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-2xl font-extrabold mb-2">Order Confirmed! 🎉</h1>
        <p className="text-surface-400 mb-2">Your order has been placed successfully.</p>
        <p className="text-sm text-surface-500 mb-10">
          Confirmation sent to <span className="text-surface-300">{shipping_.email}</span>
        </p>
        <button
          onClick={onComplete}
          className="px-8 py-3 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-xl transition-colors"
        >
          Continue Shopping
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      {/* Back */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-surface-400 hover:text-surface-100 mb-8 transition-colors text-sm"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to cart
      </button>

      {/* Progress steps */}
      <div className="flex items-center justify-center mb-10">
        {[
          { n: 1, label: 'Shipping' },
          { n: 2, label: 'Payment' },
        ].map((s, i) => (
          <div key={s.n} className="flex items-center gap-3">
            {i > 0 && <div className={`w-16 h-0.5 ${step >= s.n ? 'bg-brand-500' : 'bg-surface-700'}`} />}
            <div className={`flex items-center gap-2 ${step >= s.n ? 'text-brand-400' : 'text-surface-600'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                step > s.n  ? 'bg-brand-500 text-white' :
                step === s.n ? 'bg-brand-500 text-white ring-4 ring-brand-500/20' :
                'bg-surface-800 text-surface-500'
              }`}>
                {step > s.n ? <Check className="w-4 h-4" /> : s.n}
              </div>
              <span className="hidden sm:inline text-sm font-medium">{s.label}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">

        {/* ── Forms ── */}
        <div className="lg:col-span-2">

          {/* Step 1 – Shipping */}
          {step === 1 && (
            <form onSubmit={handleShippingSubmit}>
              <div className="bg-surface-900 rounded-xl border border-surface-800 p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Truck className="w-5 h-5 text-brand-500" />
                  <h2 className="text-lg font-bold">Shipping Information</h2>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelCls}>First Name</label>
                    <input type="text" required className={inputCls}
                      value={shipping_.firstName}
                      onChange={(e) => setShipping_({ ...shipping_, firstName: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Last Name</label>
                    <input type="text" required className={inputCls}
                      value={shipping_.lastName}
                      onChange={(e) => setShipping_({ ...shipping_, lastName: e.target.value })}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className={labelCls}>Email</label>
                    <input type="email" required className={inputCls}
                      value={shipping_.email}
                      onChange={(e) => setShipping_({ ...shipping_, email: e.target.value })}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className={labelCls}>Street Address</label>
                    <input type="text" required placeholder="123 Main St" className={inputCls}
                      value={shipping_.address}
                      onChange={(e) => setShipping_({ ...shipping_, address: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>City</label>
                    <input type="text" required className={inputCls}
                      value={shipping_.city}
                      onChange={(e) => setShipping_({ ...shipping_, city: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={labelCls}>State</label>
                      <input type="text" required className={inputCls}
                        value={shipping_.state}
                        onChange={(e) => setShipping_({ ...shipping_, state: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className={labelCls}>ZIP</label>
                      <input type="text" required className={inputCls}
                        value={shipping_.zip}
                        onChange={(e) => setShipping_({ ...shipping_, zip: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label className={labelCls}>Phone</label>
                    <input type="tel" required className={inputCls}
                      value={shipping_.phone}
                      onChange={(e) => setShipping_({ ...shipping_, phone: e.target.value })}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-6 py-3 bg-brand-500 hover:bg-brand-600 text-white font-semibold
                             rounded-xl transition-colors shadow-lg shadow-brand-500/30"
                >
                  Continue to Payment
                </button>
              </div>
            </form>
          )}

          {/* Step 2 – Payment */}
          {step === 2 && (
            <form onSubmit={handlePaymentSubmit}>
              <div className="bg-surface-900 rounded-xl border border-surface-800 p-6">
                <div className="flex items-center gap-2 mb-6">
                  <CreditCard className="w-5 h-5 text-brand-500" />
                  <h2 className="text-lg font-bold">Payment Information</h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className={labelCls}>Card Number</label>
                    <input type="text" required placeholder="1234 5678 9012 3456" className={inputCls}
                      value={payment.cardNumber}
                      onChange={(e) => setPayment({ ...payment, cardNumber: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls}>Expiry Date</label>
                      <input type="text" required placeholder="MM/YY" className={inputCls}
                        value={payment.expiry}
                        onChange={(e) => setPayment({ ...payment, expiry: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className={labelCls}>CVV</label>
                      <input type="text" required placeholder="123" className={inputCls}
                        value={payment.cvv}
                        onChange={(e) => setPayment({ ...payment, cvv: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <label className={labelCls}>Name on Card</label>
                    <input type="text" required className={inputCls}
                      value={payment.nameOnCard}
                      onChange={(e) => setPayment({ ...payment, nameOnCard: e.target.value })}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-5 p-3 bg-surface-800 rounded-lg">
                  <Lock className="w-4 h-4 text-surface-500 shrink-0" />
                  <span className="text-xs text-surface-500">Your payment information is secure and encrypted.</span>
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 py-3 border border-surface-700 text-surface-300 hover:bg-surface-800
                               font-medium rounded-xl transition-colors text-sm"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="flex-1 py-3 bg-brand-500 hover:bg-brand-600 text-white font-semibold
                               rounded-xl transition-colors shadow-lg shadow-brand-500/30 disabled:opacity-60"
                  >
                    {isProcessing ? 'Processing…' : `Pay $${total.toFixed(2)}`}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>

        {/* ── Order summary ── */}
        <div className="lg:col-span-1">
          <div className="bg-surface-900 rounded-xl border border-surface-800 p-6 sticky top-24">
            <h2 className="text-lg font-bold mb-4">Order Summary</h2>

            <div className="space-y-3 mb-5 max-h-56 overflow-y-auto pr-1">
              {items.map((item, idx) => (
                <div key={`${item.product.id}-${item.selectedSize}-${idx}`} className="flex gap-3">
                  <div className="w-12 h-12 shrink-0 bg-surface-800 rounded-lg flex items-center justify-center text-2xl">
                    {item.product.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-surface-200 truncate">{item.product.name}</p>
                    <p className="text-xs text-surface-500">
                      Qty {item.quantity}{item.selectedSize ? ` · Size ${item.selectedSize}` : ''}
                    </p>
                  </div>
                  <p className="text-sm font-semibold shrink-0">${(item.product.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="space-y-2.5 pt-4 border-t border-surface-800 text-sm">
              <div className="flex justify-between"><span className="text-surface-400">Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between"><span className="text-surface-400">Shipping</span><span>{shipping === 0 ? <span className="text-brand-400">Free</span> : `$${shipping.toFixed(2)}`}</span></div>
              <div className="flex justify-between"><span className="text-surface-400">Tax</span><span>${tax.toFixed(2)}</span></div>
              <div className="flex justify-between font-bold text-base pt-2 border-t border-surface-800">
                <span>Total</span><span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
