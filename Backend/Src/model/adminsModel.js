import pool from "../common/connect.js";

// Quản trị người dùng
export const findUserListByRole = async (role) => {
    const [row] = await pool.query(`
    SELECT user_id , user_name , user_date_of_birth , role, status FROM USER
    WHERE role = ?
    `, [role]);
    return row;
}

export const findUserListByStatus = async (status) => {
    const [row] = await pool.query(`
    SELECT user_id , user_name , user_date_of_birth , role, status FROM USER
    WHERE status = ?
    `, [status]);
    return row;

}

export const prohibitUser = async (role, user_id) => {
    const [result] = await pool.query(`
        UPDATE User
        SET status = ?   
        WHERE user_id = ?
        `, [role, user_id])
    return result.affectedRows;
}

export const changeRole = async (role, user_id) => {
    const [result] = await pool.query(`
        UPDATE User 
        SET role = ?
        WHERE user_id = ?
        `, [role, user_id]);
    return result.affectedRows;
}
// 

// Quản trị Nhạc



