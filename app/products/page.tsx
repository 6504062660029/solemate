"use client"
export const dynamic = "force-dynamic"

import { ProductFilters } from "@/components/product-filters"
import { Separator } from "@/components/ui/separator"
import { ProductGridWrapper } from "./ProductGridWrapper"  // 👈 เปลี่ยนมาใช้ wrapper

export default function ProductsPage() {
  return (
    <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">All Products</h1>
        <p className="text-muted-foreground">Browse our collection of shoes</p>
      </div>
      <Separator className="my-6" />

      <div className="flex flex-col gap-8 md:flex-row">
        <div className="md:w-1/4 lg:w-1/5">
          <ProductFilters />
        </div>
        <div className="flex-1">
          <ProductGridWrapper />
        </div>
      </div>
    </div>
  )
}
