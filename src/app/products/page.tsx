// src/app/products/page.tsx
import { Product } from '@/types'
import ProductCard from '@/components/ProductCard'

export const revalidate = 3600

export default async function ProductsPage() {
    const res = await fetch(
        'https://raw.githubusercontent.com/marouanenili/stock_updater/main/products.json',
        { next: { revalidate: 3600 } }
    )

    const products: Product[] = await res.json()
    const inStock = products.filter(p => p.stock > 0)

    return (
        <main className="p-6 max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">Catalogue produits</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {inStock.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </main>
    )
}
