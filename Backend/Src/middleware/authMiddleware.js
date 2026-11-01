import jwt from 'jsonwebtoken';
import user from '../model/usersModel.js'

export const protectedRoute = (req, res, next) => {

    try {

    } catch (error) {
        console.error('Lỗi khi xác minh JWT', error);
        return res.status(500).json({ message: "Lỗi server" })
    }

}