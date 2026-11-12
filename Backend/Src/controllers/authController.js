import {
    registerUser,
    saveRefreshToken,
    deleteRefreshToken,
    findRefreshToken,
    deleteEmailTokenOfUser,
    saveEmailToken,
    findEmailToken,
    setEmailVerified,
    updatePassword,
    deleteRefreshTokenOfUser
} from "../model/authModel.js";

import {
    findAuthByAccount,
    findByEmail,
    findByAccount
} from "../model/usersModel.js";

import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { sendMail } from "../utils/mailer.js";
import crypto from 'crypto';

const ACCESS_TOKEN_TTL = '30m';
const REFRESH_TOKEN_TTL = 14 * 24 * 60 * 60 * 1000;
const EMAIL_TOKEN_TTL = {
    verify_email: 24 * 60 * 60 * 1000,
    reset_password: 15 * 60 * 1000
}

function createAccessToken(user_id) {
    const accessToken = jwt.sign(
        { user_id: user_id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: ACCESS_TOKEN_TTL }
    );
    return accessToken;
}
// Tạo email_Token
export const createEmailToken = async (user_id, type) => {
    await deleteEmailTokenOfUser(user_id, type);
    const token = crypto.randomBytes(64).toString("hex");
    const expiresAt = new Date(Date.now() + EMAIL_TOKEN_TTL[type]);

    await saveEmailToken(user_id, token, type, expiresAt);
    return token;
}


export const postRegister = async (req, res) => {

    try {
        const { user_name, user_account, user_password, user_email, user_date_of_birth } = req.body;
        if (!user_name || !user_account || !user_email || !user_password || !user_date_of_birth) {
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
        const user_id = await registerUser({ user_name, user_account, user_password: hashedPassword, user_email, user_date_of_birth });
        try {
            await sendVerificationEmail(user_id, user_email);
        } catch (error) {
            console.error("Gửi mail xác minh thất bại", error)
        }
        return res.status(201).json({ message: "Đăng ký thành công" });
    }
    catch (error) {
        if (error.code === "ER_DUP_ENTRY") {
            return res.status(409).json({ message: "Tên người dùng đã tồn tại" });
        }
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

        const exist = await findAuthByAccount(user_account); // Check account có tồn tại không
        if (!exist) {
            return res.status(401).json({ message: "Sai tài khoản hoặc mật khẩu!" });
        }

        const passwordCorrect = await bcrypt.compare(user_password, exist.user_password);
        if (!passwordCorrect) {
            return res.status(401).json({ message: "Sai tài khoản hoặc mật khẩu!" });
        } // dùng bcrypt so sánh mật khẩu đưa vào với mật khẩu đã được mã hóa

        const accessToken = createAccessToken(exist.user_id); // Nếu người dùng Login thành công, dùng user_id của họ để cấp Access
        const refreshToken = crypto.randomBytes(64).toString("hex");// tạo refreshToken
        const expiresAt = new Date(Date.now() + REFRESH_TOKEN_TTL);

        await saveRefreshToken(exist.user_id, refreshToken, expiresAt); // Lưu refreshToken vào DB, không lưu access

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
            }); // Trả về 1 Json, thông điệp kèm với accessToken.

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

export const sendVerificationEmail = async (user_id, user_email) => {
    const verificationToken = await createEmailToken(user_id, "verify_email");
    const link = `${process.env.SERVER_URL}/api/auth/verify-email?token=${verificationToken}`;

    await sendMail(
        user_email,
        "Xác minh email 4TMusic",
        `<h2>Chào mừng bạn đến với 4TMusic!</h2>
         <p>Bấm vào link bên dưới để xác minh email. Link có hiệu lực trong 24 giờ.</p>
         <p><a href="${link}">Xác minh email</a></p>
         <p>Nếu bạn không đăng ký tài khoản, hãy bỏ qua email này.</p>`
    );
};

export const getVerifyEmail = async (req, res) => {
    try {
        const { token } = req.query;
        if (!token) {
            return res.status(400).send("Link xác nhận không hợp lệ");
        }
        const record = await findEmailToken(token, "verify_email");
        if (!record) {
            return res.status(400).send("link không tồn tại hoặc hết hạn");
        }
        await setEmailVerified(record.user_id);
        await deleteEmailTokenOfUser(record.user_id, "verify_email");
        return res.status(200).send("Xác minh email thành công ")
    } catch (error) {
        console.error("Lỗi khi xác minh email", error);
        return res.status(500).send("Lỗi server");
    }
}

export const postResendVerification = async (req, res) => {

    try {
        const user = req.user;
        if (!user.user_email) {
            return res.status(400).json({ message: "Tài khoản chưa có email" });
        }
        if (user.is_email_verified) {
            return res.status(400).json({ message: "Tài khoản đã xác minh email" });
        }
        await sendVerificationEmail(user.user_id, user.user_email);
        return res.status(200).json({ message: "Đã gửi lại mail xác minh" })
    } catch (error) {
        console.error("Lỗi khi gửi lại xác minh", error);
        return res.status(500).json({ message: "Lỗi server" });
    }
    // API-08 (Người A)
}

export const postForgotPassword = async (req, res) => {
    try {
        const { user_email } = req.body;
        if (!user_email?.trim()) {
            return res.status(400).json({ message: "Vui lòng nhập Email" });
        }
        const record = await findByEmail(user_email.trim());
        if (!record) {
            return res.status(200).json({ message: "Nếu email tồn tại, chúng tôi đã gửi mail xác minh" })
        }
        const resetToken = await createEmailToken(record.user_id, "reset_password");
        const link = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;
        await sendMail(
            record.user_email,
            "Đặt lại mật khẩu 4TMusic",
            `<h2>Yêu cầu đặt lại mật khẩu</h2>
             <p>Bấm vào link bên dưới để đặt lại mật khẩu. Link có hiệu lực trong 15 phút.</p>
             <p><a href="${link}">Đặt lại mật khẩu</a></p>
             <p>Nếu bạn không yêu cầu, hãy bỏ qua email này.</p>`
        );
        return res.status(200).json({ message: "Nếu email tồn tại, chúng tôi đã gửi mail xác minh" })
    } catch (error) {
        console.error("Lỗi khi gọi postForgotPassword", error);
        return res.status(500).json({ message: "Lỗi server" });
    }
    // API-09 (Người A)
}

export const postResetPassword = async (req, res) => {
    try {
        const { token, new_password } = req.body;
        if (!token || !new_password) {
            return res.status(400).json({ message: "Thiếu token hoặc mật khẩu mới" });
        }
        if (new_password.length < 8) {
            return res.status(400).json({ message: "mật khẩu mới phải có ít nhất 8 ký tự" });
        }
        const record = await findEmailToken(token, "reset_password");
        if (!record) {
            return res.status(400).json({ message: "Link không tồn tại hoặc đã hết hạn" })
        }
        const hashedPassword = await bcrypt.hash(new_password, 10);
        await updatePassword(record.user_id, hashedPassword);
        await deleteEmailTokenOfUser(record.user_id, "reset_password");
        await deleteRefreshTokenOfUser(record.user_id);
        return res.status(200).json({ message: "Mật khẩu đã được đổi" });

    } catch (error) {
        console.error("Lỗi khi gọi postResetPassword", error);
        return res.status(500).json({ message: "Lỗi server" });

    }
    // API-10 (Người A)
}
