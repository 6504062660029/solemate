import { NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/db"
import { createHash } from "crypto"
import { cookies } from "next/headers"

function hashPassword(password: string) {
  return createHash("sha256").update(password).digest("hex")
}

export async function POST(req: NextRequest) {
  try {
    console.log("⏳ Login handler started");

    const body = await req.json();
    console.log("📥 Request Body:", body);

    const { email, password } = body;
    if (!email || !password) {
      console.log("❌ Missing fields");
      return NextResponse.json({ message: "Missing email or password" }, { status: 400 });
    }

    const users = await query("SELECT * FROM user WHERE email = ?", [email]);
    console.log("📦 Users from DB:", users);

    if ((users as any[]).length === 0) {
      console.log("❌ User not found");
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const user = (users as any)[0];
    const passwordHash = hashPassword(password);

    console.log("🧑 User:", user);
    console.log("🔐 Input hash:", passwordHash);
    console.log("🔐 Stored hash:", user.password_hash);

    if (passwordHash !== user.password_hash) {
      console.log("❌ Incorrect password");
      return NextResponse.json({ message: "Incorrect password" }, { status: 401 });
    }

    cookies().set("session_user_id", user.id.toString(), {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    console.log("✅ Login success");
    return NextResponse.json({ message: "Login successful" });
  } catch (error: any) {
    console.error("❌ Caught Error in Login:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

