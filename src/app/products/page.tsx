'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

type Product = {
    id: string
    nom: string
    categorie: string
    prix_vente: number
    stock: number
    lien_image: string
}

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([])
    const [quantities, setQuantities] = useState<{ [id: string]: number }>({})

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch(
                    'https://raw.githubusercontent.com/marouanenili/stock_updater/main/products.json'
                )
                const data: Product[] = await res.json()
                setProducts(data.filter((p) => p.stock > 0))
            } catch (err) {
                console.error('Erreur lors du chargement des produits', err)
            }
        }

        fetchProducts()
    }, [])

    const handleAddToCart = (product: Product) => {
        const quantity = quantities[product.id] || 1

        if (quantity < 1) {
            alert('Quantité invalide')
            return
        }

        const storedCart = localStorage.getItem('cart')
        const cart: { product: Product; quantity: number }[] = storedCart ? JSON.parse(storedCart) : []

        const existing = cart.find((item) => item.product.id === product.id)
        if (existing) {
            alert('Ce produit est déjà dans le panier.')
            return
        }

        cart.push({ product, quantity })
        localStorage.setItem('cart', JSON.stringify(cart))
        alert(`Ajouté ${quantity}x "${product.nom}" au panier.`)
    }

    return (
        <main className="p-6 max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">Catalogue produits</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {products.map((p) => (
                    <div key={p.id} className="border rounded-lg shadow-sm p-4 flex flex-col">
                        <div className="relative w-full h-48 mb-4 bg-gray-100 rounded overflow-hidden">
                            <Image
                                src={p.lien_image}
                                alt={p.nom}
                                fill
                                className="object-contain"
                            />
                        </div>
                        <h2 className="text-lg font-semibold">{p.nom}</h2>
                        <p className="text-sm text-gray-500 mb-1">{p.categorie}</p>
                        <p className="text-green-600 font-bold text-lg mb-2">
                            {p.prix_vente.toFixed(2)} DHS
                        </p>
                        <input
                            type="number"
                            min="1"
                            max={p.stock}
                            value={quantities[p.id] || 1}
                            onChange={(e) =>
                                setQuantities({ ...quantities, [p.id]: Number(e.target.value) })
                            }
                            className="w-full border rounded px-2 py-1 mb-2"
                        />
                        <button
                            onClick={() => handleAddToCart(p)}
                            className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                        >
                            Ajouter au panier
                        </button>
                    </div>
                ))}
            </div>
        </main>
    )
}
