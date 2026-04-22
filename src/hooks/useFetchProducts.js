import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks.js'
import { setLoading, loadProducts } from '../store/slices/productsSlice.js'
import { initialProducts } from '../store/slices/productsSlice.js'

// Phase 4 – custom hook that uses useEffect to simulate fetching products from an API.
// The Redux store starts with an empty items array; this hook dispatches the data
// after a short delay to mimic a real network request.
export function useFetchProducts() {
  const dispatch = useAppDispatch()
  const { isLoading } = useAppSelector((state) => state.products)

  useEffect(() => {
    // Show a loading spinner while the simulated request is in-flight
    dispatch(setLoading(true))

    // Simulate async API call (e.g. fetch('/api/products').then(r => r.json()))
    const timer = setTimeout(() => {
      dispatch(loadProducts(initialProducts))
    }, 800)

    // Cleanup: cancel the timer if the component unmounts before it fires
    return () => clearTimeout(timer)
  }, [dispatch])

  return { isLoading }
}
