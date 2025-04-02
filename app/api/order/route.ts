import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { query } from "@/lib/db"

export async function GET() {
  try {
    const sessionId = parseInt(cookies().get("session_user_id")?.value || "0")

    if (!sessionId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const orders = await query(
      `SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC`,
      [sessionId]
    )

    return NextResponse.json({ orders })
  } catch (err: any) {
    console.error("Fetch orders error:", err)
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
  }
}
