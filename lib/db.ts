import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost",          // ✅ FIXED: เปลี่ยนจาก "db" เป็น "localhost"
  user: "root",               // ✅ หรือชื่อผู้ใช้ที่คุณใช้ใน MySQL
  password: "",               // ✅ ถ้ามีรหัสผ่านใส่ตรงนี้ เช่น "1234"
  database: "solemate",       // ✅ ตรวจสอบว่ามี database ชื่อนี้
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export async function query(sql: string, params?: any[]) {
  const [rows] = await pool.execute(sql, params);
  return rows;
}
