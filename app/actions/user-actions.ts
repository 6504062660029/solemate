"use server"

import { cookies } from "next/headers"
import { v4 as uuidv4 } from "uuid"

// Mock user registration
export async function registerUser(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const firstName = formData.get("firstName") as string
  const lastName = formData.get("lastName") as string

  // For demo purposes, just log the data and return success
  console.log("Demo registration:", { email, firstName, lastName })

  return { success: true, message: "Registration successful" }
}

// Mock user login
export async function loginUser(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  // For demo purposes, just log the data and set a mock session cookie
  console.log("Demo login:", { email })

  // Set a mock session cookie
  const sessionId = uuidv4()
  cookies().set("session_id", sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
  })

  return { success: true, message: "Login successful" }
}

