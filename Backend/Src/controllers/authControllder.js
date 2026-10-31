import { registerUser, signInUser, signOutUser, outUser, refreshAccessToken } from "../model/authModel.js";
import { findByAccount, findByEmail } from "../model/usersModel.js";
import bcrypt, { hash } from "bcrypt";

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
            return res.status(409).json({ message: "Thiếu account hoặc password !" });
        }

        const exist = await findByAccount(user_account); // Check account có tồn tại không
        if (!exist) {
            return res.status(401).json({ message: "Tài khoản không tồn tại!" });
        }

        const passwordCorrect = await bcrypt.compare(user_password, exist.hashedPassword);
        if (!passwordCorrect) {
            return res.status(401).json({ message: "Sai tài khoản hoặc mật khẩu!" });
        } // dùng bcrypt so sánh mật khẩu đưa vào với mật khẩu đã được mã hóa


    }

    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi server" });
    }
}
