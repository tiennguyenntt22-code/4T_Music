import {
  findAll,
  findByAccount,
  findById,
  findByEmail,
  findByUsername
} from "../model/usersModel.js";

export const getAllUser = async (req, res) => {
  try {
    const users = await findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const users = await findById(req.params.user_id);
    if (!users) return res.status(404).json({ message: "Không tìm thấy user" });
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server" });
  }
};

export const getUserByAccount = async (req, res) => {
  try {
    const users = await findByAccount(req.params.user_account);
    if (!users) return res.status(404).json({ message: "Không tìm thấy user" });
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server" });
  }
};

export const getUserByEmail = async (req, res) => {
  try {
    const users = await findByEmail(req.params.user_email);
    if (!users)
      return res.status(404).json({ message: "Không tìm thấy email" });
    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server" });
  }
};

export const getUserByName = async (req, res) => {
  try {
    const { user_name } = req.params;
    const users = await findByUsername(user_name);
    if (users.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy tên người dùng" });
    }
    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Lỗi server" })
  }
}