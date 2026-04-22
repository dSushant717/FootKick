import { useState } from 'react'
import { useAppDispatch, useAppSelector } from './store/hooks.js'
import { setSelectedProduct, setFilter } from './store/slices/productsSlice.js'

// Layout
import Header from './components/layout/Header.jsx'
import Footer from './components/layout/Footer.jsx'

// Pages / sections
import ProductList   from './components/products/ProductList.jsx'
import ProductDetail from './components/products/ProductDetail.jsx'
import Cart          from './components/cart/Cart.jsx'
import Checkout      from './components/checkout/Checkout.jsx'
import AuthForms     from './components/auth/AuthForms.jsx'
import AboutUs        from './components/pages/AboutUs.jsx'
import ContactUs      from './components/pages/ContactUs.jsx'
import FAQ            from './components/pages/FAQ.jsx'
import Shipping       from './components/pages/Shipping.jsx'
import Returns        from './components/pages/Returns.jsx'
import Careers        from './components/pages/Careers.jsx'
import PrivacyPolicy  from './components/pages/PrivacyPolicy.jsx'
import TermsOfService from './components/pages/TermsOfService.jsx'

/*
 * Pages controlled by useState – Phase 1 & 2
 *   products | product-detail | cart | checkout | login | register
 */
export default function App() {
  const dispatch = useAppDispatch()
  const selectedProduct  = useAppSelector((s) => s.products.selectedProduct)
  const { isAuthenticated } = useAppSelector((s) => s.auth)

  // Phase 1 – useState to switch between pages (conditional rendering)
  const [currentPage,  setCurrentPage]  = useState('products')
  const [previousPage, setPreviousPage] = useState('products')

  // ── Navigation handler ──────────────────────────────────────────────────────
  const handleNavigate = (page) => {
    const categoryPages = ['jerseys', 'boots', 'balls', 'accessories']

    if (page === 'products' || page === 'all') {
      dispatch(setFilter('all'))
      setCurrentPage('products')
    } else if (categoryPages.includes(page)) {
      dispatch(setFilter(page))
      setCurrentPage('products')
    } else {
      setCurrentPage(page)
    }
  }

  // ── Product selection ───────────────────────────────────────────────────────
  const handleSelectProduct = (product) => {
    dispatch(setSelectedProduct(product))
    setPreviousPage(currentPage)
    setCurrentPage('product-detail')
  }

  const handleBackFromDetail = () => {
    dispatch(setSelectedProduct(null))
    setCurrentPage(previousPage)
  }

  // ── Checkout (Phase 5 – auth guard) ────────────────────────────────────────
  const handleCheckout = () => {
    if (isAuthenticated) {
      setCurrentPage('checkout')
    } else {
      // Not logged in → send to login, remember we came from cart
      setPreviousPage('cart')
      setCurrentPage('login')
    }
  }

  // ── Auth success ────────────────────────────────────────────────────────────
  const handleAuthSuccess = () => {
    if (previousPage === 'cart') {
      // Was trying to checkout → take them straight there
      setCurrentPage('checkout')
    } else {
      setCurrentPage('products')
    }
  }

  // ── Page renderer (Phase 2 – conditional rendering) ────────────────────────
  const renderPage = () => {
    switch (currentPage) {

      case 'product-detail':
        return selectedProduct ? (
          <ProductDetail
            product={selectedProduct}
            onBack={handleBackFromDetail}
            onGoToCart={() => setCurrentPage('cart')}
          />
        ) : null

      case 'cart':
        return (
          <Cart
            onContinueShopping={() => handleNavigate('products')}
            onCheckout={handleCheckout}
          />
        )

      case 'checkout':
        return (
          <Checkout
            onBack={() => setCurrentPage('cart')}
            onComplete={() => handleNavigate('products')}
          />
        )

      case 'about':
        return <AboutUs onNavigate={handleNavigate} />

      case 'contact':
        return <ContactUs />

      case 'faq':
        return <FAQ />

      case 'shipping':
        return <Shipping />

      case 'returns':
        return <Returns />

      case 'careers':
        return <Careers />

      case 'privacy':
        return <PrivacyPolicy />

      case 'terms':
        return <TermsOfService />

      case 'login':
        return (
          <AuthForms
            mode="login"
            onBack={() => handleNavigate('products')}
            onSuccess={handleAuthSuccess}
            onSwitchMode={() => setCurrentPage('register')}
          />
        )

      case 'register':
        return (
          <AuthForms
            mode="register"
            onBack={() => handleNavigate('products')}
            onSuccess={handleAuthSuccess}
            onSwitchMode={() => setCurrentPage('login')}
          />
        )

      // default: products listing
      default:
        return (
          <ProductList onSelectProduct={handleSelectProduct} />
        )
    }
  }

  return (
    <div className="min-h-screen bg-surface-950 flex flex-col">
      <Header currentPage={currentPage} onNavigate={handleNavigate} />
      <main className="flex-1">
        {renderPage()}
      </main>
      <Footer onNavigate={handleNavigate} />
    </div>
  )
}
