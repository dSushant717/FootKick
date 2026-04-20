import { useMemo } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/hooks.js'
import { setFilter } from '../../store/slices/productsSlice.js'
import { useFetchProducts } from '../../hooks/useFetchProducts.js'
import ProductCard from './ProductCard.jsx'
import { Loader2 } from 'lucide-react'

const CATEGORIES = [
  { id: 'all',         label: 'All Products' },
  { id: 'jerseys',     label: 'Jerseys' },
  { id: 'boots',       label: 'Boots' },
  { id: 'balls',       label: 'Balls' },
  { id: 'accessories', label: 'Accessories' },
]

export default function ProductList({ onSelectProduct }) {
  const dispatch = useAppDispatch()
  const { items, filter, searchQuery } = useAppSelector((s) => s.products)

  // Phase 4 – useEffect inside this custom hook simulates async data fetching
  const { isLoading } = useFetchProducts()

  const filteredProducts = useMemo(() => {
    return items.filter((p) => {
      const matchCategory = filter === 'all' || p.category === filter
      const matchSearch =
        searchQuery === '' ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      return matchCategory && matchSearch
    })
  }, [items, filter, searchQuery])

  const heading = CATEGORIES.find((c) => c.id === filter)?.label ?? 'All Products'

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      {/* Hero banner */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2">{heading}</h1>
        <p className="text-surface-400">Premium football gear for players of all levels</p>
      </div>

      {/* Category filter pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => dispatch(setFilter(cat.id))}
            className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
              filter === cat.id
                ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/30'
                : 'bg-surface-800 text-surface-400 hover:bg-surface-700 hover:text-surface-100 border border-surface-700'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Search result count */}
      {searchQuery && (
        <p className="text-sm text-surface-400 mb-6">
          {filteredProducts.length} result{filteredProducts.length !== 1 ? 's' : ''} for &ldquo;{searchQuery}&rdquo;
        </p>
      )}

      {/* Loading state */}
      {isLoading ? (
        <div className="flex justify-center items-center py-24">
          <Loader2 className="w-8 h-8 text-brand-500 animate-spin" />
        </div>
      ) : filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={() => onSelectProduct(product)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <span className="text-5xl mb-4 block">🔍</span>
          <p className="text-surface-400 mb-4">No products found</p>
          <button
            onClick={() => dispatch(setFilter('all'))}
            className="text-sm text-brand-500 hover:text-brand-400 font-medium"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  )
}
