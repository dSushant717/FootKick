# FootKick ⚽ – E-commerce Frontend Application

A full-featured football gear e-commerce app built with **React + Vite**, **Redux Toolkit**, and **Tailwind CSS**.

---

## Project Overview

FootKick is a single-page e-commerce application for premium football equipment.  
Users can browse products by category, view detailed product pages, manage a shopping cart, and complete a two-step checkout — with authentication required to proceed to payment.

---

## Setup & Run Instructions

### Prerequisites
- Node.js 18+ installed
- npm or yarn

### 1. Install dependencies
```bash
npm install
```

### 2. Start development server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for production
```bash
npm run build
```

### 4. Preview production build
```bash
npm run preview
```

---

## Key Features

| Feature | Description |
|---|---|
| **Product Listing** | Browse all 12 products in a responsive grid with category filter pills and live search |
| **Product Detail** | Full-page view with size selector, quantity control, and add-to-cart with feedback |
| **Shopping Cart** | Add / remove / update items, automatic shipping & tax calculation |
| **Checkout** | Two-step form (Shipping → Payment) with order confirmation |
| **Authentication** | Register / Login forms with validation; checkout is protected — unauthenticated users are redirected to login first |
| **Redux State** | Global state managed with Redux Toolkit (products, cart, auth slices) |
| **Custom Hooks** | `useFetchProducts` (useEffect for data loading) and `useCart` (encapsulates cart logic) |
| **Responsive Design** | Mobile-first layout with Tailwind CSS; collapsible mobile navigation |

---

## Project Structure

```
src/
├── components/
│   ├── auth/
│   │   └── AuthForms.jsx       # Login & Register forms (Phase 5)
│   ├── cart/
│   │   └── Cart.jsx            # Shopping cart page (Phase 2)
│   ├── checkout/
│   │   └── Checkout.jsx        # 2-step checkout (Phase 2)
│   ├── layout/
│   │   ├── Header.jsx          # Sticky nav with search & cart badge
│   │   └── Footer.jsx
│   └── products/
│       ├── ProductCard.jsx     # Grid card with quick-add
│       ├── ProductDetail.jsx   # Full product page (Phase 2)
│       └── ProductList.jsx     # Filtered/searchable grid (Phase 2)
├── hooks/
│   ├── useFetchProducts.js     # useEffect hook – simulates API fetch (Phase 4)
│   └── useCart.js              # Custom hook encapsulating cart logic (Phase 4)
├── store/
│   ├── index.js                # Redux store (Phase 3)
│   ├── hooks.js                # useAppDispatch / useAppSelector
│   └── slices/
│       ├── authSlice.js        # User auth state
│       ├── cartSlice.js        # Cart items
│       └── productsSlice.js    # Product list, filter, search, selected product
├── App.jsx                     # Page routing via useState (Phase 1)
├── main.jsx                    # React root + Redux Provider
└── index.css                   # Tailwind directives + base styles
```

---

## Phase Checklist

- [x] **Phase 1** – Vite project setup, Header/Footer layout, conditional rendering with `useState`
- [x] **Phase 2** – ProductList, ProductDetail, Cart, Checkout components with page transitions
- [x] **Phase 3** – Redux store with `productsSlice`, `cartSlice`, `authSlice`; `useDispatch` / `useSelector` throughout
- [x] **Phase 4** – `useState` for UI interactions (size, quantity, form fields); `useEffect` in `useFetchProducts`; custom hooks `useFetchProducts` and `useCart`
- [x] **Phase 5** – Login/Register forms; auth state in Redux; checkout restricted to authenticated users
- [x] **Phase 6** – Tested: product selection, cart operations (add, update, remove, clear), checkout flow, auth redirect
- [x] **Phase 7** – README, commented code, organised repository

---

## Tech Stack

- **React 18** with functional components and hooks
- **Vite 5** – fast development server and build tool
- **Redux Toolkit** – `configureStore`, `createSlice`, `useDispatch`, `useSelector`
- **React Redux** – Provider and hooks integration
- **Tailwind CSS 3** – utility-first styling
- **Lucide React** – icon library
