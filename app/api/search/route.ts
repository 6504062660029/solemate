export const dynamic = "force-dynamic"

import { NextResponse } from "next/server"
import { searchProducts } from "@/app/actions/product-actions"

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const query = url.searchParams.get("q")

    if (!query) {
      return NextResponse.json({ products: [] })
    }

    const products = await searchProducts(query)
    return NextResponse.json({ products })
  } catch (error) {
    console.error("Error in search API route:", error)
    return NextResponse.json({ error: "Failed to search products" }, { status: 500 })
  }
}
