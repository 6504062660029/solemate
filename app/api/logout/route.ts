import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST() {
  cookies().set("session_user_id", "", {
    path: "/",
    maxAge: 0, // ✅ ลบทิ้ง
  })

  return NextResponse.redirect(new URL("/login", process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"))
}
