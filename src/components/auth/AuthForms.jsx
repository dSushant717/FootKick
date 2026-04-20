import { useState } from 'react'
import { ArrowLeft, Mail, Lock, User, Eye, EyeOff } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../../store/hooks.js'
import { loginStart, loginSuccess, loginFailure, clearError } from '../../store/slices/authSlice.js'

export default function AuthForms({ mode, onBack, onSuccess, onSwitchMode }) {
  const dispatch = useAppDispatch()
  const { isLoading, error } = useAppSelector((s) => s.auth)

  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value })

  // Phase 5 – simulate login / registration
  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch(clearError())
    dispatch(loginStart())

    // Simulate network delay
    await new Promise((r) => setTimeout(r, 1000))

    if (!form.email || !form.password) {
      dispatch(loginFailure('Please fill in all required fields.'))
      return
    }

    if (mode === 'register' && form.password !== form.confirm) {
      dispatch(loginFailure('Passwords do not match.'))
      return
    }

    if (mode === 'register' && form.password.length < 6) {
      dispatch(loginFailure('Password must be at least 6 characters.'))
      return
    }

    dispatch(
      loginSuccess({
        id: Date.now().toString(),
        email: form.email,
        name: mode === 'register' ? form.name || form.email.split('@')[0] : form.email.split('@')[0],
      })
    )
    onSuccess()
  }

  const inputCls =
    'w-full pl-10 pr-4 py-2.5 bg-surface-800 border border-surface-700 rounded-lg text-surface-100 ' +
    'placeholder-surface-600 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent'

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">

        {/* Back */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-surface-400 hover:text-surface-100 mb-8 transition-colors text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to shop
        </button>

        <div className="bg-surface-900 rounded-2xl border border-surface-800 p-8">

          {/* Logo + title */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 mx-auto mb-4 bg-brand-500 rounded-xl flex items-center justify-center shadow-lg shadow-brand-500/30">
              <span className="text-white font-black text-xl">FK</span>
            </div>
            <h1 className="text-2xl font-extrabold">
              {mode === 'login' ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="text-surface-400 text-sm mt-1">
              {mode === 'login' ? 'Sign in to access your account' : 'Join FootKick and start shopping'}
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-5 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">

            {mode === 'register' && (
              <div>
                <label className="block text-sm font-medium text-surface-300 mb-1.5">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-500" />
                  <input type="text" placeholder="John Doe" className={inputCls}
                    value={form.name} onChange={set('name')} />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-surface-300 mb-1.5">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-500" />
                <input type="email" required placeholder="you@example.com" className={inputCls}
                  value={form.email} onChange={set('email')} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-surface-300 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required placeholder="••••••••"
                  className={inputCls + ' pr-10'}
                  value={form.password} onChange={set('password')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-surface-500 hover:text-surface-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {mode === 'register' && (
              <div>
                <label className="block text-sm font-medium text-surface-300 mb-1.5">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-500" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required placeholder="••••••••"
                    className={inputCls}
                    value={form.confirm} onChange={set('confirm')}
                  />
                </div>
              </div>
            )}

            {mode === 'login' && (
              <div className="text-right">
                <button type="button" className="text-xs text-brand-500 hover:text-brand-400">
                  Forgot password?
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-brand-500 hover:bg-brand-600 text-white font-semibold
                         rounded-xl transition-colors shadow-lg shadow-brand-500/30
                         disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            >
              {isLoading
                ? 'Please wait…'
                : mode === 'login' ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          {/* Switch mode */}
          <p className="text-center text-sm text-surface-500 mt-6">
            {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <button
              onClick={onSwitchMode}
              className="text-brand-400 hover:text-brand-300 font-semibold"
            >
              {mode === 'login' ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>

        <p className="text-center text-xs text-surface-600 mt-5">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  )
}
