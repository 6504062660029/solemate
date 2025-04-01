import { NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/db"
import { createHash } from "crypto"
import { cookies } from "next/headers"

function hashPassword(password: string) {
  return createHash("sha256").update(password).digest("hex")
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json({ message: "Missing email or password" }, { status: 400 })
    }

    const users = await query("SELECT * FROM user WHERE email = ?", [email])
    if ((users as any[]).length === 0) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    const user = (users as any)[0]
    const passwordHash = hashPassword(password)

    if (passwordHash !== user.password_hash) {
      return NextResponse.json({ message: "Incorrect password" }, { status: 401 })
    }

    // ✅ เก็บ session ลง cookie
    cookies().set("session_user_id", user.id.toString(), {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24, // 1 วัน
    })

    return NextResponse.json({ message: "Login successful", user: { id: user.id, email: user.email } })
  } catch (error: any) {
    console.error("Login error:", error)
    return NextResponse.json({ message: "Server error" }, { status: 500 })
  }
}
