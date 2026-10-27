import pool from "../common/connect.js";

export const findAll = async () => {
  const [rows] = await pool.query(`SELECT user_id,
        user_name, user_date_of_birth, user_account, user_language,avatar_url, 
        role, status, user_email, is_email_verified, created_at FROM User `);
  return rows;
};

export const findById = async (user_id) => {
  const [rows] = await pool.query(
    `SELECT user_id,
        user_name, user_date_of_birth, user_account, user_language,avatar_url, 
        role, status, user_email, is_email_verified, created_at 
        FROM User WHERE user_id = ?`,
    [user_id],
  );
  return rows[0];
};

export const findByAccount = async (user_account) => {
  const [rows] = await pool.query(
    `SELECT user_id,
        user_name, user_date_of_birth, user_account, user_language,avatar_url, 
        role, status, user_email, is_email_verified, created_at 
        FROM User WHERE user_account = ?`,
    [user_account],
  );
  return rows[0];
};

export const findByEmail = async (user_email) => {
  const [rows] = await pool.query(
    `SELECT user_id,
        user_name, user_date_of_birth, user_account, user_language,avatar_url, 
        role, status, user_email, is_email_verified, created_at 
        FROM User WHERE user_email = ?`,
    [user_email],
  );
  return rows[0];
};

export const findByUsername = async (user_name) => {
  const [rows] = await pool.query(
    `SELECT user_id,
        user_name, user_date_of_birth, user_account, user_language,avatar_url, 
        role, status, user_email, is_email_verified, created_at 
        FROM User WHERE user_email = ?`,
    [user_email],
  );
  return rows[0];
};
