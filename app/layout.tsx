import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"
import { CartProvider } from "@/context/cart-context"
import { WishlistProvider } from "@/context/wishlist-context"
import { SearchProvider } from "@/context/search-context"
import { Toaster } from "@/components/ui/toaster"
import Footer from "./footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SoleMate - Find your perfect pair",
  description: "Quality shoes for every occasion",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <WishlistProvider>
            <SearchProvider>
              <Navbar />
              <main className="min-h-[calc(100vh-80px)] w-full">{children}</main>
              <Footer />
              <Toaster />
            </SearchProvider>
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  )
}



import './globals.css'