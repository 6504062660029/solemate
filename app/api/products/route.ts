import { NextResponse } from "next/server"
import { query } from "@/lib/db"

export async function GET() {
  try {
    const products = await query("SELECT * FROM products")

    const parsed = products.map((p: any) => ({
      ...p,
      price: Number(p.price),
      original_price: p.original_price ? Number(p.original_price) : null,
      image_url: p.image_url || `/image/pid${p.id}.png`, // ✅ ใช้จาก DB หรือ fallback
    }))

    return NextResponse.json({ products: parsed })
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json({ error: "Failed to load products" }, { status: 500 })
  }
}
