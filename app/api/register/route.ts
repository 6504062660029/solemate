import { NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/db"
import { createHash } from "crypto"

function hashPassword(password: string) {
  return createHash("sha256").update(password).digest("hex")
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { firstName, lastName, email, password } = body

    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 })
    }

    const existing = await query("SELECT id FROM user WHERE email = ?", [email])
    if ((existing as any[]).length > 0) {
      return NextResponse.json({ message: "Email already exists" }, { status: 409 })
    }

    const passwordHash = hashPassword(password)

    await query(
      "INSERT INTO user (email, password_hash, first_name, last_name) VALUES (?, ?, ?, ?)",
      [email, passwordHash, firstName, lastName]
    )

    return NextResponse.json({ message: "User registered successfully" })
  } catch (error: any) {
    console.error("Register error:", error)
    return NextResponse.json({ message: "Server error" }, { status: 500 })
  }
}
