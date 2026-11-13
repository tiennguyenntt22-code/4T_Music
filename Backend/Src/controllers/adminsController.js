import { changeRole, findUserListByRole, findUserListByStatus, prohibitUser } from "../model/adminsModel.js";
import { findById } from "../model/usersModel.js";

export const getUserListByRole = async (req, res) => {
    const { role } = req.query;
    try {
        const result = await findUserListByRole(role);
        return res.status(200).json({ message: "Lấy danh sách theo vai trò thành công", result });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Lỗi server" });
    }
}

export const getUserListByStatus = async (req, res) => {
    const { status } = req.query;
    try {
        const result = await findUserListByStatus(status);
        return res.status(200).json({ message: "Lấy danh sách theo trạng thái thành công", result });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Lỗi server" });
    }
}

export const banUser = async (req, res) => {
    const { user_id } = req.params;
    const { role, status } = req.body;
    try {
        const exist = await findById(user_id);
        if (!exist) {
            return res.status(404).json({ message: "Người dùng không tồn tại" });
        }
        if (!["active", "banned",].includes(status)) {
            return res.status(400).json({ message: "status là active hoặc banned" })
        }
        const result = await prohibitUser(status, user_id);
        if (!result) {
            return res.status(400).json({ message: "Lỗi không thể chặn hoặc mở chặn người dùng" })
        }
        return res.status(200).json({ message: "Chặn hoặc mở chặn người dùng thành công!" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Lỗi server" });
    }
}

export const updateRole = async (req, res) => {
    const { role } = req.body;
    const { user_id } = req.params;
    try {
        const exist = await findById(user_id);
        if (!exist) {
            return res.status(404).json({ message: "Người dùng không tồn tại" });
        }
        if (!["admin", "user", "artist"].includes(role)) {
            return res.status(400).json({ message: "Vai trò của người dùng là user, artist hoặc admin" });
        }
        const result = await changeRole(role, user_id);
        if (!result) {
            return res.status(400).json({ message: "Lỗi không thể cập nhật vai trò người dùng" })
        }
        return res.status(200).json({ message: "Cập nhật vai trò người dùng thành công!" })
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Lỗi server" });
    }
}



// export const changeRole = async (role, user_id) => {
//     const [result] = await pool.query(`
//         UPDATE User 
//         SET role = ?
//         WHERE user_id = ?
//         `, [role, user_id]);
//     return result.affectedRows;
// }