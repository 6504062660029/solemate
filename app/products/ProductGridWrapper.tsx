"use client"

import { Suspense } from "react"
import { ProductGrid } from "@/components/product-grid"

export function ProductGridWrapper() {
  return (
    <Suspense fallback={<div>Loading products...</div>}>
      <ProductGrid />
    </Suspense>
  )
}
