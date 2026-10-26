import pool from "../common/connect.js";

export const findAll = async () => {
  const [rows] = await pool.query(`SELECT user_id,
        user_name, user_date_of_birth, user_account, user_language,avatar_url, 
        role, status, user_email, is_email_verified, created_at FROM User `);
  return rows;
};
