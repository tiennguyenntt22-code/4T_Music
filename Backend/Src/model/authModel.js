import pool from "mysql2";
import crypto from "crypto";

export const registerUser = async ({ user_name, user_account, user_password, user_email, user_date_of_birth }) => {
    const [result] = await pool.query(`
            INSERT INTO User(user_name, user_account, user_password, user_email, user_date_of_birth)
            VALUES (?, ?, ?, ?, ?);
    `, [user_name, user_account, user_password, user_email, user_date_of_birth]);
    return result.insertId;
};

// ===== Login =================================================================

const hashToken = (token) => crypto.createHash("sha256").update(token).digest("hex");
// Băm refreshToken trước khi lưu vào DB.

// ===== REFRESH TOKEN =====
export const saveRefreshToken = async (user_id, token, expiresAt) => {
    await pool.query(`
        INSERT INTO RefreshToken (user_id, token_hash, expires_at) 
        VALUES (?, ?, ?);
        `, [user_id, token, expiresAt]);
}// Lưu refreshToken vào DB


export const findRefreshToken = async (token) => {
    const [row] = await pool.query(`
        SELECT * FROM RefreshToken 
        WHERE token_hash = ? AND expires_at > NOW()
        `, [hashToken(token)]);
    return row[0];
}// Tìm refreshToken còn hạn trong DB


export const deleteRefreshToken = async (token) => {
    await pool.query(`
        DELETE FROM RefreshToken 
        WHERE token_hash = ? 
        `, [hashToken(token)]);
}// Xóa 1 refreshToken
// ======================================================================

export const signOutUser = async ({ }) => {
    const [result] = await pool.query(`
    `, []);
    return result.insertId;
};

export const refreshAccessToken = async ({ }) => {
    const [result] = await pool.query(`
    `, []);
    return result.insertId;
};

export const identifyEmaliUser = async ({ }) => {
    const [result] = await pool.query(`
    `, []);
    return result.insertId;
};
