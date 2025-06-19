// components/ProductCard.tsx
'use client'

import Image from 'next/image'
import { Product } from '@/types'
import { addToCart } from '@/lib/cart'

export default function ProductCard({ product }: { product: Product }) {
    const handleAddToCart = () => {
        addToCart(product)
        alert(`"${product.nom}" a été ajouté au panier !`)
    }

    return (
        <div className="border p-4 rounded shadow-sm flex flex-col">
            <div className="relative w-full h-48 bg-gray-100 rounded mb-2 overflow-hidden">
                <Image src={product.lien_image} alt={product.nom} fill className="object-contain" />
            </div>
            <h2 className="text-lg font-semibold">{product.nom}</h2>
            <p className="text-sm text-gray-500">{product.categorie}</p>
            <p className="text-green-700 font-bold my-2">{product.prix_vente.toFixed(2)} DHS</p>
            <button
                onClick={handleAddToCart}
                className="mt-auto bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700"
            >
                Ajouter au panier
            </button>
        </div>
    )
}
