import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { query } from "@/lib/db"

export default async function DashboardPage() {
  const sessionId = cookies().get("session_user_id")?.value

  if (!sessionId) {
    redirect("/login")
  }

  // ดึงข้อมูลผู้ใช้
  const users = await query("SELECT * FROM user WHERE id = ?", [sessionId])
  const user = (users as any)[0]

  // ดึงคำสั่งซื้อ
  const orders = await query(
    "SELECT id, total, payment_method, created_at FROM orders WHERE user_id = ? ORDER BY created_at DESC",
    [sessionId]
  )

  return (
    <div className="max-w-screen-md mx-auto px-4 py-12 space-y-10">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          Welcome, {user.first_name} {user.last_name} 👋
        </h1>
        <form action="/api/logout" method="POST">
          <button className="px-4 py-2 text-sm bg-red-500 hover:bg-red-600 text-white rounded-md">
            Logout
          </button>
        </form>
      </div>

      <div className="border rounded-lg p-6 space-y-2">
        <h2 className="text-xl font-semibold mb-4">Order History</h2>
        {orders.length === 0 ? (
          <p className="text-muted-foreground">You have no orders yet.</p>
        ) : (
          <ul className="space-y-3">
            {orders.map((order: any) => (
              <li key={order.id} className="border rounded p-4">
                <div className="flex justify-between">
                  <span>
                    Order ID: <strong>#{order.id}</strong>
                  </span>
                  <span className="text-muted-foreground text-sm">
                    {new Date(order.created_at).toLocaleString()}
                  </span>
                </div>
                <p>Payment: <strong>{order.payment_method}</strong></p>
                <p>Total: <strong>${parseFloat(order.total).toFixed(2)}</strong></p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
