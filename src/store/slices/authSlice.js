// Phase 5 – Auth slice stores the currently logged-in user and authentication status.
// isAuthenticated is checked in App.jsx to guard the checkout route —
// unauthenticated users are redirected to the login page first.
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true
      state.error = null
    },
    loginSuccess: (state, action) => {
      state.isLoading = false
      state.user = action.payload
      state.isAuthenticated = true
      state.error = null
    },
    loginFailure: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },
    logout: (state) => {
      state.user = null
      state.isAuthenticated = false
      state.error = null
    },
    clearError: (state) => {
      state.error = null
    },
  },
})

export const { loginStart, loginSuccess, loginFailure, logout, clearError } = authSlice.actions
export default authSlice.reducer
