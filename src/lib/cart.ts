// lib/cart.ts
import { Product } from '@/types'

export type CartItem = {
    product: Product
    quantity: number
}

export function getCart(): CartItem[] {
    if (typeof window === 'undefined') return []
    const stored = localStorage.getItem('cart')
    return stored ? JSON.parse(stored) : []
}

export function saveCart(cart: CartItem[]) {
    localStorage.setItem('cart', JSON.stringify(cart))
    // 🔔 notifier manuellement
    if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('cart-updated'))
    }
}

export function addToCart(product: Product, quantity: number = 1) {
    const cart = getCart()
    const existing = cart.find(item => item.product.id === product.id)

    if (existing) {
        existing.quantity += quantity
    } else {
        cart.push({ product, quantity })
    }

    saveCart(cart)

}


export function removeFromCart(productId: string) {
    const cart = getCart().filter(item => item.product.id !== productId)
    saveCart(cart)

}

export function updateQuantity(productId: string, quantity: number) {
    const cart = getCart().map(item =>
        item.product.id === productId ? { ...item, quantity } : item
    )
    saveCart(cart)

}

export function clearCart() {
    localStorage.removeItem('cart')
}
