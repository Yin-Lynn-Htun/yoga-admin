// CartContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react'

interface CartContextType {
  cartItems: YogaClass[]
  addToCart: (item: YogaClass) => void
  removeFromCart: (itemId: string) => void
  clearCart: () => void
  getCartCount: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<YogaClass[]>([])

  const addToCart = (item: YogaClass) => {
    const isItemInCart = cartItems.some((cartItem) => cartItem.id === item.id)
    if (!isItemInCart) {
      setCartItems([...cartItems, item])
    }
  }

  const removeFromCart = (itemId: string) => {
    setCartItems(cartItems.filter((item) => item.id.toString() !== itemId))
  }

  const clearCart = () => {
    setCartItems([])
  }

  const getCartCount = () => {
    return cartItems.length
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        getCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
