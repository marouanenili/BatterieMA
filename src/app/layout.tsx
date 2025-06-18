import './globals.css';
import type { ReactNode } from "react"

type RootLayoutProps = {
    children: ReactNode
}
export const metadata = {
    title: 'batterie.ma – Batteries Auto & Moto',
    description: 'batterie.ma : dépannage et installation de batteries auto/moto en urgence',
};

export default function RootLayout({ children }:RootLayoutProps) {
    return (
        <html lang="fr">
        <body className="bg-gray-100 text-gray-900 font-sans"
              style={{
                      backgroundImage: "url('/bgBlured3.png')",
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                  }}>

        <header className="flex items-center justify-between px-6 py-4 bg-white shadow">
            <div className="flex items-center space-x-2">
                <Image src="/logo2.png" alt="batterie.ma logo" className="h-8" />
                <span className="text-xl font-bold text-blue-600">batterie.ma</span>
            </div>
            <nav className="flex space-x-6 text-gray-700 font-medium">
                <a Link ="/" className="hover:text-blue-600">Home</a>
                <a Link ="/products" className="hover:text-blue-600">Produits</a>
                <a Link ="/contact" className="hover:text-blue-600">Contact</a>
            </nav>
        </header>

        <main className="p-6 max-w-4xl mx-auto">{children}</main>

        <footer className="footer">
            © 2025 Batterie.ma — Dépannage et remplacement de batteries à Casablanca et région
        </footer>

        </body>
        </html>
    );
}

