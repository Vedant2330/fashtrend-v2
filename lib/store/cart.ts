'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Product } from '@/lib/data/products'

export interface CartItem {
  productId: string
  slug: string
  name: string
  price: number
  image: string
  color: string
  size: string
  quantity: number
  customDesign?: {
    text?: string
    imageUrl?: string
  }
}

export interface WishlistItem {
  productId: string
  slug: string
  name: string
  price: number
  image: string
}

interface CartState {
  items: CartItem[]
  wishlist: WishlistItem[]
  isOpen: boolean
  
  // Actions
  addToCart: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void
  removeFromCart: (productId: string, color: string, size: string) => void
  updateQuantity: (productId: string, color: string, size: string, quantity: number) => void
  clearCart: () => void
  openCart: () => void
  closeCart: () => void
  toggleCart: () => void
  
  addToWishlist: (product: Product) => void
  removeFromWishlist: (productId: string) => void
  isInWishlist: (productId: string) => boolean
  
  // Computed
  getItemCount: () => number
  getSubtotal: () => number
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      wishlist: [],
      isOpen: false,
      
      addToCart: (item, quantity = 1) => {
        set((state) => {
          const existingIndex = state.items.findIndex(
            (i) => i.productId === item.productId && i.color === item.color && i.size === item.size
          )
          
          if (existingIndex > -1) {
            const newItems = [...state.items]
            newItems[existingIndex] = {
              ...newItems[existingIndex],
              quantity: newItems[existingIndex].quantity + quantity
            }
            return { items: newItems, isOpen: true }
          }
          
          return { items: [...state.items, { ...item, quantity }], isOpen: true }
        })
      },
      
      removeFromCart: (productId, color, size) => {
        set((state) => ({
          items: state.items.filter(
            (i) => !(i.productId === productId && i.color === color && i.size === size)
          )
        }))
      },
      
      updateQuantity: (productId, color, size, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(productId, color, size)
          return
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.productId === productId && i.color === color && i.size === size
              ? { ...i, quantity }
              : i
          )
        }))
      },
      
      clearCart: () => set({ items: [] }),
      
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      
      addToWishlist: (product) => {
        set((state) => {
          if (state.wishlist.some(i => i.productId === product.id)) return state
          return {
            wishlist: [
              ...state.wishlist,
              {
                productId: product.id,
                slug: product.slug,
                name: product.name,
                price: product.price,
                image: product.images[0],
              }
            ]
          }
        })
      },
      
      removeFromWishlist: (productId) => {
        set((state) => ({
          wishlist: state.wishlist.filter(i => i.productId !== productId)
        }))
      },
      
      isInWishlist: (productId) => {
        return get().wishlist.some(i => i.productId === productId)
      },
      
      getItemCount: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0)
      },
      
      getSubtotal: () => {
        return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0)
      },
    }),
    {
      name: 'fashtrend-v2-cart',
      partialize: (state) => ({ items: state.items, wishlist: state.wishlist }),
    }
  )
)