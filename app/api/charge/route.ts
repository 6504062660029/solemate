import Omise from "omise";
import { NextRequest, NextResponse } from "next/server";

// ✅ ใช้ process.env อย่างถูกต้อง
const omise = Omise({
  publicKey: process.env.OMISE_PUBLIC_KEY as string,
  secretKey: process.env.OMISE_SECRET_KEY as string,
});

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();

    const charge = await omise.charges.create({
      amount: 99900, // หน่วยเป็นสตางค์
      currency: "thb",
      card: token,
      description: "SoleMate Order Payment",
    });

    return NextResponse.json({ message: "Payment success", charge });
  } catch (err: any) {
    console.error("Charge error:", err);
    return NextResponse.json(
      { message: "Payment failed", error: err.message },
      { status: 500 }
    );
  }
}
