// components/Navbar.tsx
'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getCart } from '@/lib/cart'

export default function Navbar() {
    const [cartCount, setCartCount] = useState(0)

    useEffect(() => {
        const updateCartCount = () => {
            const cart = getCart()
            const total = cart.reduce((sum, item) => sum + item.quantity, 0)
            setCartCount(total)
        }

        updateCartCount()

        // Écoute les changements manuellement (optionnel)
        window.addEventListener('storage', updateCartCount)
        return () => window.removeEventListener('storage', updateCartCount)
    }, [])

    return (
        <header className="bg-white shadow py-4 px-6 flex justify-between items-center">
            <Link href="/" className="text-xl font-bold text-blue-600">
                batterie.ma
            </Link>
            <nav className="flex gap-6 items-center">
                <Link href="/products" className="text-gray-700 hover:text-blue-600">
                    Produits
                </Link>
                <Link href="/cart" className="relative text-gray-700 hover:text-blue-600">
                    🛒
                    {cartCount > 0 && (
                        <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs rounded-full px-2">
              {cartCount}
            </span>
                    )}
                </Link>
            </nav>
        </header>
    )
}
