"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

type Product = {
  id: number
  name: string
  price: number
  original_price: number
  description: string
  image_url: string
  features?: string[]
  specifications?: Record<string, string>
}

export default function ProductDetailPage({ productId }: { productId: string }) {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${productId}`)
        const data = await res.json()
        data.price = Number(data.price)
        data.original_price = Number(data.original_price)
        setProduct(data)
      } catch (err) {
        console.error("Failed to load product", err)
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [productId])

  if (loading) return <p className="p-6">Loading...</p>
  if (!product) return <p className="p-6">Product not found</p>

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <Image
          src={product.image_url || "/placeholder.svg"}
          alt={product.name}
          width={500}
          height={500}
          className="rounded object-cover"
        />
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-xl font-semibold text-primary">${product.price.toFixed(2)}</p>
          {product.original_price > product.price && (
            <p className="text-sm text-muted-foreground line-through">
              ${product.original_price.toFixed(2)}
            </p>
          )}
          <p className="mt-4">{product.description}</p>

          {Array.isArray(product.features) && (
            <div className="mt-6">
              <h3 className="font-semibold mb-2">Features</h3>
              <ul className="list-disc pl-5 space-y-1">
                {product.features.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>
          )}

          {product.specifications && (
            <div className="mt-6">
              <h3 className="font-semibold mb-2">Specifications</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                {Object.entries(product.specifications).map(([key, val]) => (
                  <div key={key} className="flex justify-between border-b py-1">
                    <span className="font-medium capitalize">{key}</span>
                    <span>{val}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
