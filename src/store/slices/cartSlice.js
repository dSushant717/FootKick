import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity, selectedSize } = action.payload
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
        item.quantity = Math.max(1, quantity)
      }
    },
    clearCart: (state) => {
      state.items = []
    },
  },
})

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions
export default cartSlice.reducer
