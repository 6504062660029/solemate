"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ProductCard } from "@/components/product-card"
import type { Product } from "@/types/product" // 👈 เพิ่ม type ตรงนี้

export function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]) // 👈 ใช้ Product[]
  const [sortOption, setSortOption] = useState("featured")
  const [isLoading, setIsLoading] = useState(true)
  const searchParams = useSearchParams()

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("/api/products")
        const data = await response.json()

        let filteredProducts = [...data.products] as Product[]

        const minPrice = Number(searchParams.get("minPrice") || 0)
        const maxPrice = Number(searchParams.get("maxPrice") || 200)
        filteredProducts = filteredProducts.filter(
          (product) => product.price >= minPrice && product.price <= maxPrice,
        )

        const categories = searchParams.get("categories")?.split(",").filter(Boolean) || []
        if (categories.length > 0) {
          const categoryMap: Record<number, string> = {
            1: "athletic",
            2: "casual",
            3: "formal",
            4: "outdoor",
            5: "sandals",
          }
          filteredProducts = filteredProducts.filter((product) => {
            const productCategory = categoryMap[product.category_id || 0] || ""
            return categories.includes(productCategory)
          })
        }

        const brands = searchParams.get("brands")?.split(",").filter(Boolean) || []
        if (brands.length > 0) {
          filteredProducts = filteredProducts.filter((product) =>
            brands.includes(product.brand.toLowerCase()),
          )
        }

        setProducts(filteredProducts)
      } catch (error) {
        console.error("Error fetching products:", error)
        setProducts([
          {
            id: 1,
            name: "Air Max Pulse",
            brand: "Nike",
            price: 149.99,
            original_price: 169.99,
            rating: 4.8,
            review_count: 124,
            image_url: "/image/pid1.png",
            is_new: true,
            is_best_seller: true,
          },
          {
            id: 2,
            name: "Ultraboost Light",
            brand: "Adidas",
            price: 189.99,
            original_price: 189.99,
            rating: 4.9,
            review_count: 86,
            image_url: "/image/pid2.png",
            is_new: true,
            is_best_seller: false,
          },
          {
            id: 3,
            name: "Classic Leather Loafer",
            brand: "Cole Haan",
            price: 129.99,
            original_price: 159.99,
            rating: 4.7,
            review_count: 52,
            image_url: "/image/pid3.png",
            is_new: false,
            is_best_seller: true,
          },
          {
            id: 4,
            name: "Chuck Taylor All Star",
            brand: "Converse",
            price: 59.99,
            original_price: 59.99,
            rating: 4.6,
            review_count: 215,
            image_url: "/image/pid4.png",
            is_new: false,
            is_best_seller: true,
          },
        ])
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [searchParams])

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortOption) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      case "newest":
        return a.is_new ? -1 : 1
      default:
        return a.is_best_seller ? -1 : 1
    }
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing <strong>{products.length}</strong> products
        </p>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Sort by:</span>
          <Select value={sortOption} onValueChange={setSortOption}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-[400px] rounded-lg bg-gray-100 animate-pulse"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
