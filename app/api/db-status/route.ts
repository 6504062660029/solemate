import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    status: "demo",
    message: "Using demo data for preview",
  })
}

