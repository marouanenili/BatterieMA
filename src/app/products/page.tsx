// app/products/page.tsx
import Link from "next/link"
import Image from "next/image"

export const revalidate = 60 // Revalide toutes les 60 secondes

type Product = {
    id: string
    nom: string
    categorie: string
    prix_vente: number
    stock: number
    lien_image: string
}

export default async function ProductsPage() {
    const res = await fetch(
        'https://raw.githubusercontent.com/marouanenili/stock_updater/main/products.json',
        { next: { revalidate: 60 } }
    )

    if (!res.ok) throw new Error('Erreur de chargement des produits')

    const products: Product[] = await res.json()
    const inStockProducts = products.filter((p) => p.stock > 0)
    return (
        <main className="p-6 max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">Catalogue produits</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {inStockProducts.map((p) => (
                    <div key={p.id} className="border rounded-lg shadow-sm p-4 flex flex-col">
                        <div className="relative w-full h-48 mb-4 bg-gray-100 rounded overflow-hidden">
                            <Image src="/logo2.png"
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

                    </div>
                ))}
            </div>
        </main>
    )
}
