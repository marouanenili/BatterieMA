import './globals.css'
import type { ReactNode } from "react"
import Navbar from "@/components/Navbar"
import { Toaster } from 'react-hot-toast'
type RootLayoutProps = {
    children: ReactNode
}

export const metadata = {
    title: 'batterie.ma – Batteries Auto & Moto',
    description: 'batterie.ma : dépannage et installation de batteries auto/moto en urgence',
}

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="fr">
        <body
            className="bg-gray-100 text-gray-900 font-sans"
            style={{
                backgroundImage: "url('/bgBlured3.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
        {/* ✅ Navbar complète ici */}
        <Navbar />

        {/* ✅ Page content */}
        <main className="p-6 max-w-4xl mx-auto">{children}</main>
        <Toaster position="top-right" />
        {/* ... */}
        <footer className="footer mt-12 text-center text-sm text-gray-600">
            © 2025 Batterie.ma — Dépannage et remplacement de batteries à Casablanca et région
        </footer>
        </body>
        </html>
    )
}
