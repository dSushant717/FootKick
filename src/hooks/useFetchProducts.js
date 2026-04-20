import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks.js'
import { setLoading, loadProducts } from '../store/slices/productsSlice.js'

// Phase 4 – custom hook using useEffect to simulate fetching products
// In a real app this would call an API; here we re-load the static data
// after a short simulated network delay so the loading state is visible.
export function useFetchProducts() {
  const dispatch = useAppDispatch()
  const { items, isLoading } = useAppSelector((state) => state.products)

  useEffect(() => {
    // Only "fetch" once (items already populated from initialState)
    if (items.length > 0) return

    dispatch(setLoading(true))

    const timer = setTimeout(() => {
      // In production you would do: fetch('/api/products').then(r => r.json())...
      dispatch(loadProducts(items))
    }, 800)

    return () => clearTimeout(timer)
  }, [dispatch, items])

  return { isLoading }
}
