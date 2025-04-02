import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { hashPassword } from "@/lib/hash";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { first_name, last_name, email, password } = body;

    // ✅ ตรวจสอบว่า field ไม่ว่าง
    if (!first_name || !last_name || !email || !password) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    // ✅ ตรวจสอบอีเมลซ้ำ
    const existing = await query("SELECT * FROM user WHERE email = ?", [email]);
    if ((existing as any[]).length > 0) {
      return NextResponse.json({ message: "Email already exists" }, { status: 400 });
    }

    // ✅ เข้ารหัสรหัสผ่าน
    const password_hash = hashPassword(password);

    // ✅ เพิ่มข้อมูลผู้ใช้ใหม่
    await query(
      `INSERT INTO user (email, password_hash, first_name, last_name, created_at)
       VALUES (?, ?, ?, ?, NOW())`,
      [email, password_hash, first_name, last_name]
    );

    return NextResponse.json({ message: "Registration successful" }, { status: 201 });
  } catch (error) {
    console.error("❌ Register error:", error);
    return NextResponse.json({ message: "404" }, { status: 500 });
  }
}
