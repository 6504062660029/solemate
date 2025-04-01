import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET() {
  const session = cookies().get("session_user_id")?.value

  return NextResponse.json({
    loggedIn: !!session,
    userId: session || null,
  })
}
