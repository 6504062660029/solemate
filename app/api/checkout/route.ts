import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/db"
import { writeFile } from "fs/promises"
import path from "path"

export async function POST(req: NextRequest) {
  try {
    const sessionId = cookies().get("session_user_id")?.value
    if (!sessionId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const formData = await req.formData()
    const fullName = formData.get("fullName") as string
    const address = formData.get("address") as string
    const phone = formData.get("phone") as string
    const paymentMethod = formData.get("paymentMethod") as string
    const slip = formData.get("slip") as File | null

    let slipUrl: string | null = null

    if (slip) {
      const bytes = await slip.arrayBuffer()
      const buffer = Buffer.from(bytes)
      const fileName = `${Date.now()}_${slip.name}`
      const filePath = path.join(process.cwd(), "public", "slips", fileName)

      await writeFile(filePath, buffer)
      slipUrl = `/slips/${fileName}`
    }

    await query(
      `INSERT INTO orders (user_id, full_name, address, phone, payment_method, payment_status, slip_url, total)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        sessionId,
        fullName,
        address,
        phone,
        paymentMethod,
        paymentMethod === "card" ? "paid" : "pending",
        slipUrl,
        999.99, // 📝 ปรับเป็นยอดรวมจริงได้
      ]
    )

    return NextResponse.json({ message: "Order placed successfully" })
  } catch (err: any) {
    console.error("Checkout error:", err)
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
  }
}