import { findAll, create } from "../model/songModel.js";

export const getAllSong = async (req, res) => {
    try {
        const songs = await findAll();
        res.status(200).json(songs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi server" });
    }

}

export const postSong = async (req, res) => {
    try {
        const { song_name, duration } = req.body;
        if (!song_name) {
            return res.status(400).json({ message: "Thiếu tiêu đề bài hát" });
        }
        const newId = await create({ song_name, duration });
        return res.status(200).json({ message: "Thêm bài hát thành công" });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Lỗi server" });
    }
}

export const updateSong = (req, res) => {
    res.status(200).json("cập nhật bài hát mới thành công");
}
export const deleteSong = (req, res) => {
    res.status(200).json("bài hát đã được xóa");
}
