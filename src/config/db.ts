import mysql from "mysql2/promise";

export const db = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "pet",
  password: process.env.DB_PASS || "pet",
  database: process.env.DB_NAME || "petcare_db",
});
