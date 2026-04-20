import { useAppDispatch, useAppSelector } from '../store/hooks.js'
import { addToCart, removeFromCart, updateQuantity, clearCart } from '../store/slices/cartSlice.js'

// Phase 4 – custom hook that encapsulates all cart logic
export function useCart() {
  const dispatch = useAppDispatch()
  const items = useAppSelector((state) => state.cart.items)

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const shipping = subtotal > 100 ? 0 : subtotal === 0 ? 0 : 9.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  const add = (product, quantity = 1, selectedSize = undefined) => {
    dispatch(addToCart({ product, quantity, selectedSize }))
  }

  const remove = (productId, selectedSize) => {
    dispatch(removeFromCart({ productId, selectedSize }))
  }

  const update = (productId, selectedSize, quantity) => {
    if (quantity < 1) {
      remove(productId, selectedSize)
    } else {
      dispatch(updateQuantity({ productId, selectedSize, quantity }))
    }
  }

  const clear = () => dispatch(clearCart())

  return { items, totalItems, subtotal, shipping, tax, total, add, remove, update, clear }
}
