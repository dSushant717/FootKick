// Phase 3 – Cart slice manages the list of items the user has added to their cart.
// Each item stores the full product object, selected size, and quantity.
// The same product in different sizes is treated as a separate cart entry.
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [], // array of { product, quantity, selectedSize }
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity, selectedSize } = action.payload
      // If the exact product+size combo already exists, just increase the quantity
      const existing = state.items.find(
        (item) => item.product.id === product.id && item.selectedSize === selectedSize
      )
      if (existing) {
        existing.quantity += quantity
      } else {
        state.items.push({ product, quantity, selectedSize })
      }
    },
    removeFromCart: (state, action) => {
      const { productId, selectedSize } = action.payload
      // Remove only the entry that matches both product id and size
      state.items = state.items.filter(
        (item) => !(item.product.id === productId && item.selectedSize === selectedSize)
      )
    },
    updateQuantity: (state, action) => {
      const { productId, selectedSize, quantity } = action.payload
      const item = state.items.find(
        (item) => item.product.id === productId && item.selectedSize === selectedSize
      )
      if (item) {
        item.quantity = Math.max(1, quantity) // prevent quantity going below 1
      }
    },
    // Clears the entire cart (called after a successful checkout)
    clearCart: (state) => {
      state.items = []
    },
  },
})

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions
export default cartSlice.reducer
