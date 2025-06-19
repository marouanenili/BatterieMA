// app/products/page.tsx

import Image from "next/image"
import { Product } from "../types"

export const revalidate = 3600 // Rebuild toutes les 1h

export default async function ProductsPage() {
    const res = await fetch(
        'https://raw.githubusercontent.com/marouanenili/stock_updater/main/products.json',
        { next: { revalidate: 3600 } }
    )

    if (!res.ok) throw new Error("Erreur lors du chargement des produits")

    const all: Product[] = await res.json()
    const inStock = all.filter((p) => p.stock > 0)

    return (
        <main className="p-6 max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">Catalogue produits</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {inStock.map((product) => (
                    <div key={product.id} className="border p-4 rounded shadow-sm flex flex-col">
                        <div className="relative w-full h-48 bg-gray-100 rounded mb-2 overflow-hidden">
                            <Image src={product.lien_image} alt={product.nom} fill className="object-contain" />
                        </div>
                        <h2 className="text-lg font-semibold">{product.nom}</h2>
                        <p className="text-sm text-gray-500">{product.categorie}</p>
                        <p className="text-green-700 font-bold my-2">{product.prix_vente.toFixed(2)} DHS</p>
                        <form action="/cart" method="POST">
                            <input type="hidden" name="productId" value={product.id} />
                            <button type="submit" className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700">
                                Ajouter au panier
                            </button>
                        </form>
                    </div>
                ))}
            </div>
        </main>
    )
}
