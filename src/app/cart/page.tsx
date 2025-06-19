// app/cart/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { CartItem, getCart, updateQuantity, removeFromCart, clearCart } from '@/lib/cart'
import Image from 'next/image'

export default function CartPage() {

    const [cart, setCart] = useState<CartItem[]>([])
    const phoneNumber = '33753644375' // ✅ ton numéro sans le + (212 = Maroc)

    const handleWhatsAppOrder = () => {
        const lines = cart.map(
            (item) =>
                `• ${item.product.nom} (${item.quantity}x) - ${item.product.prix_vente.toFixed(2)} DHS`
        )
        const total = cart.reduce(
            (sum, item) => sum + item.quantity * item.product.prix_vente,
            0
        )

        const message = `Bonjour, je souhaite commander les batteries suivantes :\n\n${lines.join(
            '\n'
        )}\n\nTotal : ${total.toFixed(2)} DHS`

        const encoded = encodeURIComponent(message)
        const url = `https://wa.me/${phoneNumber}?text=${encoded}`

        window.open(url, '_blank')
    }

    useEffect(() => {
        setCart(getCart())
    }, [])

    const handleQuantityChange = (productId: string, quantity: number) => {
        updateQuantity(productId, quantity)
        setCart(getCart())
    }

    const handleRemove = (productId: string) => {
        removeFromCart(productId)
        setCart(getCart())
    }

    const handleClear = () => {
        clearCart()
        setCart([])
    }

    const total = cart.reduce((sum, item) => sum + item.quantity * item.product.prix_vente, 0)

    return (
        <main className="p-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Votre panier</h1>

            {cart.length === 0 ? (
                <p className="text-gray-600">Votre panier est vide.</p>
            ) : (
                <div className="space-y-4">
                    {cart.map(({ product, quantity }) => (
                        <div key={product.id} className="flex items-center gap-4 border-b pb-4">
                            <div className="relative w-24 h-24 bg-gray-100">
                                <Image src={product.lien_image} alt={product.nom} fill className="object-contain" />
                            </div>
                            <div className="flex-1">
                                <h2 className="text-lg font-semibold">{product.nom}</h2>
                                <p className="text-sm text-gray-500">{product.prix_vente.toFixed(2)} DHS</p>
                                <div className="mt-2 flex items-center gap-2">
                                    <input
                                        type="number"
                                        min={1}
                                        value={quantity}
                                        onChange={(e) => handleQuantityChange(product.id, Number(e.target.value))}
                                        className="w-20 border rounded px-2 py-1"
                                    />
                                    <button
                                        onClick={() => handleRemove(product.id)}
                                        className="text-red-600 hover:underline text-sm"
                                    >
                                        Supprimer
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className="text-right mt-6 space-y-3">
                        <p className="text-xl font-bold mb-2">Total : {total.toFixed(2)} DHS</p>
                        <button
                            onClick={handleClear}
                            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                        >
                            Vider le panier
                        </button>
                        <button
                            onClick={handleWhatsAppOrder}
                            className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                        >
                            Commander via WhatsApp
                        </button>
                    </div>
                </div>
            )}
        </main>
    )
}
