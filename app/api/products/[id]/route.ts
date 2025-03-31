import { NextResponse } from "next/server"
import { getProductById } from "@/app/actions/product-actions"

export async function GET(_request: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid product ID" }, { status: 400 })
    }

    const product = await getProductById(id)

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    return NextResponse.json({ product })
  } catch (error) {
    console.error("Error in product detail API route:", error)
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 })
  }
}

