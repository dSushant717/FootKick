import { useState } from 'react'
import { ArrowLeft, Star, Minus, Plus, ShoppingBag, Check, Truck, Shield, RotateCcw } from 'lucide-react'
import { useAppDispatch } from '../../store/hooks.js'
import { addToCart } from '../../store/slices/cartSlice.js'

export default function ProductDetail({ product, onBack, onGoToCart }) {
  const dispatch = useAppDispatch()

  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0])
  const [quantity,     setQuantity]     = useState(1)
  const [addedToCart,  setAddedToCart]  = useState(false)

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0

  const handleAddToCart = () => {
    dispatch(addToCart({ product, quantity, selectedSize }))
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2500)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      {/* Back */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-surface-400 hover:text-surface-100 mb-8 transition-colors text-sm"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to products
      </button>

      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">

        {/* ── Image panel ── */}
        <div className="relative aspect-square bg-surface-800 rounded-2xl flex items-center justify-center
                        border border-surface-700 overflow-hidden">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
                e.currentTarget.nextElementSibling.style.display = 'flex'
              }}
            />
          ) : null}
          <span
            className="text-[8rem] select-none"
            style={{ display: product.image ? 'none' : 'flex' }}
          >
            {product.emoji}
          </span>

          {discount > 0 && (
            <div className="absolute top-4 left-4 bg-brand-500 text-white px-3 py-1 text-sm font-bold rounded-lg">
              {discount}% OFF
            </div>
          )}
          {!product.inStock && (
            <div className="absolute inset-0 bg-surface-950/75 flex items-center justify-center">
              <span className="text-lg font-semibold text-surface-300 bg-surface-900 px-5 py-2 rounded-full border border-surface-700">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* ── Info panel ── */}
        <div>
          <p className="text-xs uppercase tracking-widest text-brand-500 font-semibold mb-2">
            {product.category}
          </p>
          <h1 className="text-2xl sm:text-3xl font-extrabold mb-4">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-5">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i <= Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-surface-700'}`}
                />
              ))}
            </div>
            <span className="text-sm text-surface-400">
              {product.rating} &bull; {product.reviews} reviews
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-xl text-surface-500 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-surface-400 leading-relaxed mb-6">{product.description}</p>

          {/* Sizes */}
          {product.sizes && (
            <div className="mb-6">
              <p className="text-sm font-semibold mb-3">Size</p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[3rem] h-10 px-3 rounded-lg border text-sm font-medium transition-colors ${
                      selectedSize === size
                        ? 'border-brand-500 bg-brand-500 text-white'
                        : 'border-surface-700 text-surface-300 hover:border-brand-500 hover:text-brand-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="mb-7">
            <p className="text-sm font-semibold mb-3">Quantity</p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 rounded-lg border border-surface-700 hover:border-brand-500
                           flex items-center justify-center text-surface-300 transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-10 text-center font-semibold">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 rounded-lg border border-surface-700 hover:border-brand-500
                           flex items-center justify-center text-surface-300 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* CTA */}
          <div className="flex gap-3 mb-8">
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl
                         font-semibold text-sm transition-all ${
                           product.inStock
                             ? addedToCart
                               ? 'bg-green-600 text-white'
                               : 'bg-brand-500 hover:bg-brand-600 text-white shadow-lg shadow-brand-500/30 hover:shadow-brand-500/50'
                             : 'bg-surface-800 text-surface-500 cursor-not-allowed'
                         }`}
            >
              {addedToCart ? (
                <><Check className="w-5 h-5" /> Added to Cart</>
              ) : (
                <><ShoppingBag className="w-5 h-5" /> Add to Cart</>
              )}
            </button>

            {addedToCart && (
              <button
                onClick={onGoToCart}
                className="px-5 py-3 rounded-xl border border-brand-500 text-brand-400
                           hover:bg-brand-500/10 font-semibold text-sm transition-colors"
              >
                View Cart
              </button>
            )}
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-surface-800">
            {[
              { Icon: Truck,      label: 'Free Shipping' },
              { Icon: Shield,     label: 'Secure Payment' },
              { Icon: RotateCcw,  label: '30-Day Returns' },
            ].map(({ Icon, label }) => (
              <div key={label} className="text-center">
                <Icon className="w-5 h-5 mx-auto mb-1.5 text-brand-500" />
                <p className="text-xs text-surface-500">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
