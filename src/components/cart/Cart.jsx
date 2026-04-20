import { ShoppingBag, Minus, Plus, Trash2, ArrowRight } from 'lucide-react'
import { useCart } from '../../hooks/useCart.js'
import { useAppSelector } from '../../store/hooks.js'

export default function Cart({ onContinueShopping, onCheckout }) {
  // Phase 4 – all cart logic encapsulated in custom hook
  const { items, subtotal, shipping, tax, total, remove, update, clear } = useCart()
  const { isAuthenticated } = useAppSelector((s) => s.auth)

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <span className="text-6xl block mb-6">🛒</span>
        <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
        <p className="text-surface-400 mb-8">Looks like you haven&apos;t added anything yet.</p>
        <button
          onClick={onContinueShopping}
          className="px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-xl transition-colors"
        >
          Start Shopping
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold">Shopping Cart</h1>
        <button
          onClick={clear}
          className="text-sm text-surface-500 hover:text-red-400 transition-colors"
        >
          Clear cart
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">

        {/* ── Cart items ── */}
        <div className="lg:col-span-2 space-y-3">
          {items.map((item, idx) => (
            <div
              key={`${item.product.id}-${item.selectedSize}-${idx}`}
              className="flex gap-4 p-4 bg-surface-900 rounded-xl border border-surface-800"
            >
              {/* Emoji */}
              <div className="w-20 h-20 shrink-0 bg-surface-800 rounded-lg flex items-center justify-center text-4xl">
                {item.product.emoji}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-surface-100 truncate">{item.product.name}</h3>
                <p className="text-xs text-surface-500 capitalize mb-1">{item.product.category}</p>
                {item.selectedSize && (
                  <p className="text-xs text-surface-500">Size: {item.selectedSize}</p>
                )}
                <p className="text-sm font-bold text-brand-400 mt-1">
                  ${item.product.price.toFixed(2)}
                </p>
              </div>

              {/* Controls */}
              <div className="flex flex-col items-end justify-between">
                <button
                  onClick={() => remove(item.product.id, item.selectedSize)}
                  className="p-1 text-surface-600 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => update(item.product.id, item.selectedSize, item.quantity - 1)}
                    className="w-7 h-7 rounded-lg border border-surface-700 hover:border-brand-500
                               flex items-center justify-center transition-colors"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="w-6 text-center text-sm font-semibold">{item.quantity}</span>
                  <button
                    onClick={() => update(item.product.id, item.selectedSize, item.quantity + 1)}
                    className="w-7 h-7 rounded-lg border border-surface-700 hover:border-brand-500
                               flex items-center justify-center transition-colors"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Order summary ── */}
        <div className="lg:col-span-1">
          <div className="bg-surface-900 rounded-xl border border-surface-800 p-6 sticky top-24">
            <h2 className="text-lg font-bold mb-5">Order Summary</h2>

            <div className="space-y-3 mb-6 text-sm">
              <div className="flex justify-between">
                <span className="text-surface-400">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-surface-400">Shipping</span>
                <span>{shipping === 0 ? <span className="text-brand-400">Free</span> : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-surface-400">Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              {shipping > 0 && (
                <p className="text-xs text-surface-500">Free shipping on orders over $100</p>
              )}
              <div className="pt-3 border-t border-surface-800 flex justify-between font-bold text-base">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Phase 5 – restrict checkout to authenticated users */}
            <button
              onClick={onCheckout}
              className="w-full flex items-center justify-center gap-2 py-3 bg-brand-500 hover:bg-brand-600
                         text-white font-semibold rounded-xl transition-colors mb-3
                         shadow-lg shadow-brand-500/30"
            >
              {isAuthenticated ? 'Proceed to Checkout' : 'Login to Checkout'}
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onContinueShopping}
              className="w-full py-3 border border-surface-700 text-surface-300 hover:bg-surface-800
                         font-medium rounded-xl transition-colors text-sm"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
