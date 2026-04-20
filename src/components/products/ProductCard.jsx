import { Star, ShoppingBag, Plus } from 'lucide-react'
import { useAppDispatch } from '../../store/hooks.js'
import { addToCart } from '../../store/slices/cartSlice.js'

export default function ProductCard({ product, onSelect }) {
  const dispatch = useAppDispatch()

  const handleQuickAdd = (e) => {
    e.stopPropagation()
    if (!product.inStock) return
    dispatch(addToCart({ product, quantity: 1, selectedSize: product.sizes?.[0] }))
  }

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0

  return (
    <div
      onClick={onSelect}
      className="group relative bg-surface-900 rounded-xl overflow-hidden border border-surface-800
                 hover:border-brand-500/50 transition-all duration-300 cursor-pointer
                 hover:shadow-xl hover:shadow-brand-500/10 hover:-translate-y-0.5"
    >
      {/* Image / Emoji area */}
      <div className="relative aspect-square bg-surface-800 flex items-center justify-center overflow-hidden">
        <span className="text-7xl select-none transition-transform duration-300 group-hover:scale-110">
          {product.emoji}
        </span>

        {/* Sale badge */}
        {discount > 0 && (
          <div className="absolute top-3 left-3 bg-brand-500 text-white px-2 py-0.5 text-xs font-bold rounded-md">
            -{discount}%
          </div>
        )}

        {/* Out of stock overlay */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-surface-950/70 flex items-center justify-center">
            <span className="text-sm font-semibold text-surface-400 bg-surface-900 px-3 py-1 rounded-full border border-surface-700">
              Out of Stock
            </span>
          </div>
        )}

        {/* Quick-add button */}
        {product.inStock && (
          <button
            onClick={handleQuickAdd}
            className="absolute bottom-3 right-3 w-9 h-9 bg-brand-500 hover:bg-brand-600 text-white
                       rounded-lg flex items-center justify-center shadow-lg
                       opacity-0 group-hover:opacity-100 transition-all duration-200
                       translate-y-2 group-hover:translate-y-0"
            title="Quick add"
          >
            <Plus className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-xs uppercase tracking-widest text-brand-500 font-semibold mb-1">
          {product.category}
        </p>
        <h3 className="text-sm font-semibold text-surface-100 line-clamp-2 mb-2 group-hover:text-brand-400 transition-colors">
          {product.name}
        </h3>

        {/* Stars */}
        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${i <= Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-surface-700'}`}
              />
            ))}
          </div>
          <span className="text-xs text-surface-500">({product.reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="text-base font-bold text-surface-100">${product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="text-sm text-surface-500 line-through">${product.originalPrice.toFixed(2)}</span>
          )}
        </div>
      </div>
    </div>
  )
}
