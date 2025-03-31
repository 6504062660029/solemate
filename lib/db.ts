// lib/db.ts
import mysql from "mysql2/promise";

// สร้าง connection pool สำหรับเชื่อมกับฐานข้อมูล
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",        // ถ้ามีรหัสผ่านให้ใส่ตรงนี้
  database: "solemate", // เปลี่ยนเป็นชื่อฐานข้อมูลของคุณ
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// ใช้ query ได้แบบ async
export async function query(sql: string, params?: any[]) {
  const [rows] = await pool.execute(sql, params);
  return rows;
}

export default pool;
