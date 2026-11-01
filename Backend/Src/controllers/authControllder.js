import { registerUser, saveRefreshToken, deleteRefreshToken, findRefreshToken } from "../model/authModel.js";
import { findByAccount, findByEmail } from "../model/usersModel.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const ACCESS_TOKEN_TTL = '30m';
const REFRESH_TOKEN_TTL = 14 * 24 * 60 * 60 * 1000;

function createAccessToken(user_id) {
    const accessToken = jwt.sign(
        { user_id: user_id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: ACCESS_TOKEN_TTL }
    );
    return accessToken;
}

export const postRegister = async (req, res) => {

    try {
        const { user_name, user_account, user_password, user_email, user_date_of_birth } = req.body;
        if (!user_name || !user_account || !user_email || !user_password) {
            return res.status(400).json({ message: "Vui lòng nhập đủ dữ liệu!" })
        }
        const existAccount = await findByAccount(user_account);
        if (existAccount) {
            return res.status(409).json({ message: "Tài khoản đã tồn tại" })
        }
        const existEmail = await findByEmail(user_email);
        if (existEmail) {
            return res.status(409).json({ message: "Email đã được sử dụng" })
        }
        const hashedPassword = await bcrypt.hash(user_password, 10);
        await registerUser({ user_name, user_account, user_password: hashedPassword, user_email, user_date_of_birth });

        return res.status(201).json({ message: "Đăng ký thành công" });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Lỗi server" });
    }
}

export const postLogin = async (req, res) => {
    try {
        const { user_account, user_password } = req.body;
        if (!user_account || !user_password) // Check xem user đã nhập đầy đủ account và password chưa
        {
            return res.status(400).json({ message: "Thiếu account hoặc password !" });
        }

        const exist = await findByAccount(user_account); // Check account có tồn tại không
        if (!exist) {
            return res.status(401).json({ message: "Sai tài khoản hoặc mật khẩu!" });
        }

        const passwordCorrect = await bcrypt.compare(user_password, exist.user_password);
        if (!passwordCorrect) {
            return res.status(401).json({ message: "Sai tài khoản hoặc mật khẩu!" });
        } // dùng bcrypt so sánh mật khẩu đưa vào với mật khẩu đã được mã hóa

        const accessToken = createAccessToken(exist.user_id);

        const refreshToken = crypto.randomBytes(64).toString("hex");
        const expiresAt = new Date(Date.now() + REFRESH_TOKEN_TTL);

        await saveRefreshToken(exist.user_id, refreshToken, expiresAt);

        // Cất refresh token vào Cookie
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: REFRESH_TOKEN_TTL,
        });

        // Trả accessToken về res
        return res.status(200).json(
            {
                message: `Người dùng ${exist.user_name} đăng nhập thành công`,
                accessToken,
            });

    }

    catch (error) {
        console.error("Lỗi khi gọi postLogin", error);
        return res.status(500).json({ message: "Lỗi server" });
    }
};

export const postLogout = async (req, res) => {
    try {
        // Lấy refreshToken của user từ Cookie.
        const refreshToken = req.cookies?.refreshToken;
        if (refreshToken) {
            await deleteRefreshToken(refreshToken);
        }
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        });
        //--- Lưu ý ---
        return res.status(200).json({ message: "Đăng xuất thành công" })
    }
    catch (error) {
        console.error("Lỗi khi gọi postLogout", error);
        return res.status(500).json({ message: "Lỗi server" });
    }
};

export const postRefresh = async (req, res) => {
    try {
        const refreshToken = req.cookies?.refreshToken;
        if (!refreshToken) {
            return res.status(401).json({ message: "Chưa đăng nhập" });
        }
        const result = await findRefreshToken(refreshToken);

        if (!result) {
            return res.status(401).json({ message: "Hết hạn đăng nhập" });
        }
        const accessToken = createAccessToken(result.user_id);
        return res.status(200).json({ message: "Cấp accessToken mới thành công!", accessToken })

    }
    catch (error) {
        console.error("Có lỗi khi cấp lại accessToken", error);
        return res.status(500).json({ message: "Lỗi server" })
    }
};

