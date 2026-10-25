import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 20,
  timezone: "+07:00",
  charset: "utf8mb4",
});

pool.on("connection", (connection) => {
  connection.query("SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci");
});

pool.on("error", (err) => console.log("DB pool error: " + err));

export default pool;
