import { createSlice } from '@reduxjs/toolkit'

import jerseyHome from '../../images/jersey-home.jpg'
import jerseyAway from '../../images/jersey-away.jpg'
import jerseyRetro from '../../images/jersey-retro.jpg'
import bootsPredator from '../../images/boots-predator.jpg'
import bootsPhantom from '../../images/boots-phantom.jpg'
import bootsSpeed from '../../images/boots-speed.jpg'
import ballMatch from '../../images/ball-match.jpg'
import ballTraining from '../../images/ball-training.jpg'
import glovesGoalkeeper from '../../images/gloves-goalkeeper.jpg'
import shinGuards from '../../images/shin-guards.jpg'
import armbandCaptain from '../../images/armband-captain.jpg'
import bagKit from '../../images/bag-kit.jpg'

// Phase 3 – Products slice manages the product catalogue, active category filter,
// search query, selected product for the detail view, and the loading flag used
// while useFetchProducts simulates an async API call.

// Exported so useFetchProducts can simulate loading this data from an API
export const initialProducts = [
  {
    id: 1,
    name: 'Pro Elite Home Jersey 2024',
    price: 89.99,
    originalPrice: 119.99,
    description: 'Official home jersey featuring breathable Dri-FIT technology. Authentic team colors with embroidered crest. Designed for both match play and casual wear.',
    category: 'jerseys',
    emoji: '👕',
    image: jerseyHome,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    inStock: true,
    rating: 4.8,
    reviews: 324,
  },
  {
    id: 2,
    name: 'Champions Away Kit',
    price: 94.99,
    originalPrice: null,
    description: 'Premium away jersey with moisture-wicking fabric. Features gold accent detailing and slim athletic fit for maximum comfort on the pitch.',
    category: 'jerseys',
    emoji: '👕',
    image: jerseyAway,
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    rating: 4.7,
    reviews: 189,
  },
  {
    id: 3,
    name: 'Predator Edge Football Boots',
    price: 249.99,
    originalPrice: 299.99,
    description: 'Professional-grade boots with enhanced ball control zones. Lightweight design for maximum agility. Features reinforced toe box for powerful strikes.',
    category: 'boots',
    emoji: '👟',
    image: bootsPredator,
    sizes: ['7', '8', '9', '10', '11', '12'],
    inStock: true,
    rating: 4.9,
    reviews: 567,
  },
  {
    id: 4,
    name: 'Phantom GT Elite',
    price: 219.99,
    originalPrice: null,
    description: 'Precision boots designed for playmakers. Features textured upper for superior first touch and close ball control in tight spaces.',
    category: 'boots',
    emoji: '👟',
    image: bootsPhantom,
    sizes: ['7', '8', '9', '10', '11'],
    inStock: true,
    rating: 4.6,
    reviews: 234,
  },
  {
    id: 5,
    name: 'Official Match Ball',
    price: 149.99,
    originalPrice: null,
    description: 'FIFA Quality Pro certified match ball. 12-panel design for true flight and consistent touch. Used in professional leagues worldwide.',
    category: 'balls',
    emoji: '⚽',
    image: ballMatch,
    sizes: null,
    inStock: true,
    rating: 4.9,
    reviews: 892,
  },
  {
    id: 6,
    name: 'Training Ball Pro',
    price: 34.99,
    originalPrice: 44.99,
    description: 'Durable training ball built for daily practice. Machine-stitched for consistent performance in all weather conditions.',
    category: 'balls',
    emoji: '⚽',
    image: ballTraining,
    sizes: null,
    inStock: true,
    rating: 4.5,
    reviews: 445,
  },
  {
    id: 7,
    name: 'Pro Goalkeeper Gloves',
    price: 79.99,
    originalPrice: null,
    description: 'Premium latex palm for exceptional grip in all conditions. Finger protection technology included. Breathable backhand design.',
    category: 'accessories',
    emoji: '🧤',
    image: glovesGoalkeeper,
    sizes: ['7', '8', '9', '10', '11'],
    inStock: true,
    rating: 4.7,
    reviews: 156,
  },
  {
    id: 8,
    name: 'Elite Shin Guards',
    price: 39.99,
    originalPrice: null,
    description: 'Lightweight protection with ergonomic fit. Includes ankle guards and compression sleeve for maximum protection without bulk.',
    category: 'accessories',
    emoji: '🛡️',
    image: shinGuards,
    sizes: ['S', 'M', 'L'],
    inStock: true,
    rating: 4.4,
    reviews: 278,
  },
  {
    id: 9,
    name: 'Captain Armband Set',
    price: 14.99,
    originalPrice: null,
    description: 'Set of 3 captain armbands in assorted team colors. Elastic fit for comfortable wear throughout the full 90 minutes.',
    category: 'accessories',
    emoji: '💪',
    image: armbandCaptain,
    sizes: null,
    inStock: true,
    rating: 4.3,
    reviews: 89,
  },
  {
    id: 10,
    name: 'Retro Classic Jersey',
    price: 69.99,
    originalPrice: null,
    description: 'Vintage-inspired design celebrating legendary seasons. Premium cotton blend fabric for everyday comfort and nostalgic style.',
    category: 'jerseys',
    emoji: '👕',
    image: jerseyRetro,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    inStock: true,
    rating: 4.8,
    reviews: 412,
  },
  {
    id: 11,
    name: 'Speed Pro Boots',
    price: 179.99,
    originalPrice: null,
    description: 'Ultra-lightweight boots for speed demons. Carbon fiber plate for explosive acceleration. Knit upper for sock-like comfort.',
    category: 'boots',
    emoji: '👟',
    image: bootsSpeed,
    sizes: ['7', '8', '9', '10', '11', '12'],
    inStock: false,
    rating: 4.5,
    reviews: 198,
  },
  {
    id: 12,
    name: 'Premium Kit Bag',
    price: 59.99,
    originalPrice: null,
    description: 'Spacious kit bag with separate boot compartment. Water-resistant material with padded shoulder strap for easy transport.',
    category: 'accessories',
    emoji: '🎒',
    image: bagKit,
    sizes: null,
    inStock: true,
    rating: 4.6,
    reviews: 334,
  },
]

// Items start empty — useFetchProducts hook populates them via useEffect
const initialState = {
  items: [],
  selectedProduct: null,
  filter: 'all',
  searchQuery: '',
  isLoading: false,
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload
    },
    setFilter: (state, action) => {
      state.filter = action.payload
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload
    },
    // Simulates loading products (Phase 4 – useEffect)
    setLoading: (state, action) => {
      state.isLoading = action.payload
    },
    loadProducts: (state, action) => {
      state.items = action.payload
      state.isLoading = false
    },
  },
})

export const { setSelectedProduct, setFilter, setSearchQuery, setLoading, loadProducts } =
  productsSlice.actions

export default productsSlice.reducer
