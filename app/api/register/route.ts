// pages/api/register.ts
import type { NextApiRequest, NextApiResponse } from "next"
import bcrypt from "bcryptjs"
import { query } from "@/lib/db"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" })
  }

  const { firstName, lastName, email, password, phone } = req.body

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: "Missing fields" })
  }

  try {
    // Check if email already exists
    const existing = await query("SELECT id FROM user WHERE email = ?", [email])
    if ((existing as any[]).length > 0) {
      return res.status(409).json({ message: "Email already exists" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    // Insert new user
    await query(
      `INSERT INTO user 
      (email, password_hash, first_name, last_name, phone, is_admin, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, 0, NOW(), NOW())`,
      [email, hashedPassword, firstName, lastName, phone || ""]
    )

    return res.status(200).json({ message: "User registered successfully" })
  } catch (error: any) {
    console.error(error)
    return res.status(500).json({ message: "Server error" })
  }
}
