import pool from "../common/connect.js";
import crypto from "crypto";

export const registerUser = async ({ user_name, user_account, user_password, user_email, user_date_of_birth }) => {
    const [result] = await pool.query(`
            INSERT INTO User(user_name, user_account, user_password, user_email, user_date_of_birth)
            VALUES (?, ?, ?, ?, ?);
    `, [user_name, user_account, user_password, user_email, user_date_of_birth]);
    return result.insertId;
};


const hashToken = (token) => crypto.createHash("sha256").update(token).digest("hex");
// Băm refreshToken trước khi lưu vào DB.

// ===== REFRESH TOKEN =====
// ===== Login =================================================================
export const saveRefreshToken = async (user_id, token, expiresAt) => {
    await pool.query(`
        INSERT INTO RefreshToken (user_id, token_hash, expires_at) 
        VALUES (?, ?, ?);
        `, [user_id, hashToken(token), expiresAt]);
}// Lưu refreshToken vào DB

// ====== REFRESH =========
export const findRefreshToken = async (token) => {
    const [row] = await pool.query(`
        SELECT * FROM RefreshToken 
        WHERE token_hash = ? AND expires_at > NOW()
        `, [hashToken(token)]);
    return row[0];
}// Tìm refreshToken còn hạn trong DB -> Dùng cấp lại accessToken

// ====== LOGOUT ===========
export const deleteRefreshToken = async (token) => {
    await pool.query(`
        DELETE FROM RefreshToken 
        WHERE token_hash = ? 
        `, [hashToken(token)]);
}// Xóa 1 refreshToken khi SignOut
// ======================================================================

// Xác thực Email =====
export const saveEmailToken = async (user_id, token, type, expiresAt) => {
    await pool.query(`
    INSERT INTO EmailToken (user_id, token_hash, type, expires_at)
    VALUES (?, ?, ?, ?);
    `, [user_id, hashToken(token), type, expiresAt]);
}

export const findEmailToken = async (Token, type) => {
    const [row] = await pool.query(`
    SELECT * FROM EmailToken 
    WHERE token_hash = ? AND type = ? AND expires_at > NOW();
    `, [hashToken(Token), type]);
    return row[0];
}

export const deleteEmailToken = async (Token) => {
    await pool.query(`
        DELETE FROM EmailToken 
        WHERE token_hast = ?  
        `, [hashToken(Token)]);
}


export const deleteEmailTokenOfUser = async (user_id, type) => {
    await pool.query(`
    DELETE FROM EmailToken
    WHERE user_id = ? AND type = ? ;
    `, [user_id, type]);
}

export const setEmailVerified = async (user_id) => {
    await pool.query(`
        UPDATE User SET is_email_verified = 1 
        WHERE user_id = ? 
        `, [user_id]);
};

export const updatePassword = async (user_id, hashedPassword) => {
    await pool.query(`
        UPDATE User SET user_password = ? 
        WHERE user_id = ? 
        `, [hashedPassword, user_id]);
}

export const deleteRefreshTokenOfUser = async (user_id) => {
    await pool.query(`
        DELETE FROM refreshToken 
        WHERE user_id = ? 
        `, [user_id]);
}
