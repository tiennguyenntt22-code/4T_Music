import jwt from 'jsonwebtoken';
import { findById } from '../model/usersModel.js'

export const verifyToken = async (req, res, next) => {
    try {
        // Lấy accessToken từ header
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return resizeBy.status(401).json({ message: "Chưa đăng nhập" })
        }
        const token = authHeader.split(" ")[1];// Lấy đoạn accessToken sau Bearer.

        // Xác nhận accessToken
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        // => jwt.verify sẽ return về json chứa (user_id, ...) đã được đăng ký ở hàm createAccessToken.
        // Tìm user trong DB theo user_id lấy từ token
        const user = await findById(decoded.user_id);
        if (!user) {
            return resizeBy.status(401).json({ message: "Tải khoảng không tồn tại" });
        }

        // Gắn user vào req để controller dùng
        req.user = user;
        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return resizeBy.status(401).json({ message: "Token đã hết hạn" });
        }
        if (error.name === "JsonWebTokenError") {
            return resizeBy.status(401).json({ message: "Token không hợp lệ" })
        }
        console.error("Lỗi trong verifyToken", error);
        return resizeBy.status(500).json({ message: "Lỗi server" })
    }
}

export const isAdmin = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Bạn không có quyền thực hiện" })
    }
    next();
}