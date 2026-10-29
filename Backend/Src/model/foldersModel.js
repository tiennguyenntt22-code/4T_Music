import pool from "../common/connect.js";

export const findFolder = async (user_id) => {
    const [row] = await pool.query(`
    SELECT user_id , user_name, user_language, avatar_url, created_at
    FROM user 
    WHERE user_id = ?
    `, [user_id]);
    return row[0];
}// API-11 -> hiển thị tất cả thông tin của user (dùng ở phía admin);

export const updateFolder = async (user_name, user_language, user_id) => {
    const [result] = await pool.query(`
        UPDATE user 
        SET user_name = COALESCE(?, user_name) ,
        user_language = COALESCE(?, user_language) 
        WHERE user_id = ? 
        `, [user_name, user_language, user_id]);
    return result.affectedRows;
}// API-12 -> cập nhật thông tên hiển thị, ngôn ngữ, 


export const findPasswordHash = async (user_id) => {
    const [row] = await pool.query(`
    SELECT user_password 
    FROM user 
    WHERE user_id = ?
    `, [user_id]);
    return row[0]?.user_password || null;
}
export const changePassword = async (hashedPassword, user_id) => {
    const [result] = await pool.query(`
        UPDATE user
        SET user_password = ? 
        WHERE user_id = ? 
        `, [hashedPassword, user_id]);
    return result.affectedRows;
}// API-13 -> Thay đổi mật khẩu


export const addFolderImage = async (avatar_url, user_id) => {
    const [result] = await pool.query(`
        UPDATE user 
        SET avatar_url = ?
        WHERE user_id = ?
    `, [avatar_url, user_id]);
    return result.affectedRows;
}// API-14 -> Thêm ảnh đại diện.

