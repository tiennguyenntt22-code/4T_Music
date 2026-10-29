import { findFolder, updateFolder, changePassword, addFolderImage, findPasswordHash } from "../model/foldersModel.js";
import bcrypt from "bcrypt";

export const getFolder = async (req, res) => {
    try {
        const { user_id } = req.params;
        const folder = await findFolder(user_id);
        if (!folder) {
            return res.status(404).json({ message: "Không tìm thấy người dùng" });
        }
        return res.status(200).json(folder);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Lỗi server" });
    }
}

export const patchFolder = async (req, res) => {
    try {
        const { user_name, user_language } = req.body;
        const { user_id } = req.params;
        const folder = await updateFolder(user_name, user_language, user_id);
        if (folder === 0) {
            return res.status(404).json({ message: "Không tìm thấy người dùng" });
        }
        return res.status(200).json({ message: "Cập nhật thông tin thành công" });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Lỗi server" });
    }
}

export const putFolderPassword = async (req, res) => {
    try {
        const { user_id } = req.params;
        const { old_password, new_password } = req.body;

        if (!old_password || !new_password?.trim()) {
            return res.status(400).json({ message: "Thiếu mật khẩu cũ hoặc mật khẩu mới" });
        }

        const hash = await findPasswordHash(user_id);
        if (!hash) {
            return res.status(404).json({ message: "Không tìm thấy người dùng" });
        }
        const ok = await bcrypt.compare(old_password, hash);
        if (!ok) {
            return res.status(400).json({ message: "Mật khẩu cũ không đúng" })
        }
        const newHash = await bcrypt.hash(new_password, 10);
        await changePassword(newHash, user_id);

        return res.status(200).json({ message: "Đổi mật khẩu thành công!" })

    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Lỗi server" });
    }
}

export const postFolderImage = async (req, res) => {
    try {
        const { user_id } = req.params;
        const { avatar_url } = req.body;
        if (!avatar_url?.trim()) {
            return res.status(400).json({ message: "Thiếu URL" })
        }
        const folder = await addFolderImage(avatar_url, user_id);
        if (folder === 0) {
            return res.status(404).json({ message: "Không tìm thấy người dùng" });
        }
        return res.status(200).json({ message: "Cập nhật ảnh đại diện thành công!" });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Lỗi server" });
    }

}