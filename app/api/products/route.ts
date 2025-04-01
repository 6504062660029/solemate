import { NextResponse } from "next/server"
import { getProducts } from "@/app/actions/product-actions"

export async function GET() {
  try {
    const products = await getProducts()
    return NextResponse.json({ products })
  } catch (error) {
    console.error("Error in products API route:", error)
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}
