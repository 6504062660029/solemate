import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/db"

export async function POST(req: NextRequest) {
  try {
    const sessionCookie = cookies().get("session_user_id")
    const sessionId = parseInt(sessionCookie?.value || "0")
    console.log("[Checkout API] session_id:", sessionId)

    if (!sessionId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    console.log("[Checkout API] body:", body)

    const { fullName, address, phone, paymentMethod, total } = body

    const result = await query(
      `INSERT INTO orders (user_id, full_name, address, phone, payment_method, total, created_at)
       VALUES (?, ?, ?, ?, ?, ?, NOW())`,
      [sessionId, fullName, address, phone, paymentMethod, parseFloat(total)]
    )

    console.log("[Checkout API] Insert result:", result)

    return NextResponse.json({ message: "Order placed successfully" })
  } catch (err) {
    console.error("[Checkout API] error:", err)
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
  }
}
