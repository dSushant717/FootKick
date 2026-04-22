import { useState } from 'react'
import { ShoppingCart, Search, Menu, X, User, LogOut } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../../store/hooks.js'
import { setSearchQuery } from '../../store/slices/productsSlice.js'
import { logout } from '../../store/slices/authSlice.js'

const NAV_ITEMS = [
  { id: 'about',    label: 'About Us' },
  { id: 'faq',      label: 'FAQ' },
  { id: 'shipping', label: 'Shipping' },
  { id: 'contact',  label: 'Contact Us' },
]

export default function Header({ currentPage, onNavigate }) {
  const dispatch      = useAppDispatch()
  const cartItems     = useAppSelector((s) => s.cart.items)
  const { isAuthenticated, user } = useAppSelector((s) => s.auth)
  const searchQuery   = useAppSelector((s) => s.products.searchQuery)

  const [mobileOpen,  setMobileOpen]  = useState(false)
  const [searchOpen,  setSearchOpen]  = useState(false)

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  const handleNav = (id) => {
    onNavigate(id)
    setMobileOpen(false)
  }

  const handleLogout = () => {
    dispatch(logout())
    onNavigate('products')
    setMobileOpen(false)
  }

  const isActive = (id) => currentPage === id

  return (
    <header className="sticky top-0 z-50 bg-surface-900/95 backdrop-blur border-b border-surface-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* ── Logo ── */}
          <button
            onClick={() => handleNav('products')}
            className="flex items-center gap-2.5 shrink-0"
          >
            <div className="w-9 h-9 bg-brand-500 rounded-lg flex items-center justify-center shadow-lg shadow-brand-500/30">
              <span className="text-white font-black text-sm tracking-tight">FK</span>
            </div>
            <span className="text-lg font-extrabold tracking-tight hidden sm:block">
              FOOT<span className="text-brand-500">KICK</span>
            </span>
          </button>

          {/* ── Desktop nav ── */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isActive(item.id)
                    ? 'bg-brand-500 text-white'
                    : 'text-surface-400 hover:text-surface-100 hover:bg-surface-800'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* ── Actions ── */}
          <div className="flex items-center gap-1">

            {/* Search – desktop */}
            <div className="hidden sm:flex items-center">
              {searchOpen ? (
                <div className="flex items-center gap-2">
                  <input
                    autoFocus
                    type="text"
                    placeholder="Search products…"
                    value={searchQuery}
                    onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                    className="w-48 px-3 py-1.5 text-sm bg-surface-800 border border-surface-700 rounded-lg
                               text-surface-100 placeholder-surface-500
                               focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                  />
                  <button
                    onClick={() => { setSearchOpen(false); dispatch(setSearchQuery('')) }}
                    className="p-2 text-surface-400 hover:text-surface-100 hover:bg-surface-800 rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="p-2 text-surface-400 hover:text-surface-100 hover:bg-surface-800 rounded-lg transition-colors"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Cart */}
            <button
              onClick={() => handleNav('cart')}
              className={`relative p-2 rounded-lg transition-colors ${
                currentPage === 'cart'
                  ? 'bg-brand-500 text-white'
                  : 'text-surface-400 hover:text-surface-100 hover:bg-surface-800'
              }`}
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-brand-500 text-white text-xs
                                 font-bold rounded-full flex items-center justify-center
                                 ring-2 ring-surface-900">
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </button>

            {/* Auth – desktop */}
            {isAuthenticated ? (
              <div className="hidden sm:flex items-center gap-2 ml-1">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-surface-800 rounded-lg">
                  <User className="w-4 h-4 text-brand-500" />
                  <span className="text-sm text-surface-300 max-w-[80px] truncate">{user?.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 text-surface-400 hover:text-red-400 hover:bg-surface-800 rounded-lg transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2 ml-1">
                <button
                  onClick={() => handleNav('login')}
                  className="px-3 py-1.5 text-sm font-medium text-surface-300 hover:text-surface-100
                             hover:bg-surface-800 rounded-lg transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={() => handleNav('register')}
                  className="px-3 py-1.5 text-sm font-medium bg-brand-500 hover:bg-brand-600
                             text-white rounded-lg transition-colors"
                >
                  Sign Up
                </button>
              </div>
            )}

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-surface-400 hover:text-surface-100 hover:bg-surface-800 rounded-lg transition-colors"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* ── Mobile menu ── */}
        {mobileOpen && (
          <div className="md:hidden py-4 border-t border-surface-800 space-y-2">
            {/* Mobile search */}
            <div className="px-1 pb-2">
              <input
                type="text"
                placeholder="Search products…"
                value={searchQuery}
                onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                className="w-full px-3 py-2 text-sm bg-surface-800 border border-surface-700 rounded-lg
                           text-surface-100 placeholder-surface-500
                           focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>

            {/* Mobile nav */}
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`w-full text-left px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  isActive(item.id)
                    ? 'bg-brand-500 text-white'
                    : 'text-surface-400 hover:text-surface-100 hover:bg-surface-800'
                }`}
              >
                {item.label}
              </button>
            ))}

            {/* Mobile auth */}
            <div className="pt-2 border-t border-surface-800 px-1">
              {isAuthenticated ? (
                <div className="flex items-center justify-between px-3 py-2">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-brand-500" />
                    <span className="text-sm text-surface-300">{user?.name}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="text-sm text-red-400 hover:text-red-300 font-medium"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleNav('login')}
                    className="flex-1 py-2 text-sm font-medium border border-surface-700 text-surface-300
                               hover:bg-surface-800 rounded-lg transition-colors"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => handleNav('register')}
                    className="flex-1 py-2 text-sm font-medium bg-brand-500 hover:bg-brand-600
                               text-white rounded-lg transition-colors"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
