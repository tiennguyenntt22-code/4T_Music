import { findAlbumDetail, addAlbum, fixAlbum, removeAlbum, addSongToAlbum, findAlbumbyName } from "../model/albumsModel.js";
import { findArtistPage } from "../model/artistsModel.js";
import { findSongById } from "../model/songsModel.js";
import { findById } from "../model/usersModel.js";

export const getAlbumDetail = async (req, res) => {
    const { album_id } = req.params;
    try {
        const result = await findAlbumDetail(album_id);
        if (result.length === 0) {
            return res.status(404).json({ message: "Album không tồn tại" })
        }
        return res.status(200).json({ message: "Lấy chi tiết Album thành công", result })

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Lỗi server" });
    }
    // Lấy chi tiết Album
}

export const postAlbum = async (req, res) => {

    const { album_name, artist_id } = req.body;
    try {
        const exist = await findArtistPage(artist_id);
        if (!exist) {
            return res.status(400).json({ message: "Nghệ sĩ không tồn tại" })
        }
        await addAlbum(album_name, artist_id);
        return res.status(201).json({ message: "Tạo album mới thành công" })

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Lỗi server" });
    }
    // Thêm album mới
}

export const postAlbumByArtist = async (req, res) => {
    const { album_name, artist_id } = req.body;
    try {
        
        if (req.user.role !== "artist") {
            return res.status(400).json({ message: "Bạn không có quyền thêm bài hát" })
        }
        await addAlbum(album_name, artist_id);
        return res.status(201).json({ message: "Nghệ sĩ thêm bài hát thành công" })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Lỗi server" });
    }

}

export const postSongToAlbum = async (req, res) => {
    const { song_id } = req.body;
    const { album_id } = req.params
    try {
        const exist = await findSongById(song_id);
        if (!exist) {
            return res.status(404).json({ message: "Không tìm thấy bài hát" });
        }
        const exist_1 = await findAlbumDetail(album_id);
        if (exist_1.length === 0) {
            return res.status(404).json({ message: "Không tìm thấy album" });
        }
        const result = await addSongToAlbum(album_id, song_id);
        if (!result) {
            return res.status(400).json({ message: "Không thêm bài hát vào album được" })
        }
        return res.status(200).json({ message: "Thêm bài hát vào album thành công" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Lỗi server" });
    }
}

export const updateAlbum = async (req, res) => {
    const { album_name, artist_id } = req.body;
    const { album_id } = req.params;
    try {
        const exist = await findAlbumDetail(album_id);
        if (exist.length === 0) {
            return res.status(404).json({ message: "Không tìm thấy album" });
        }
        const exist_1 = await findArtistPage(artist_id);
        if (!exist_1) {
            return res.status(404).json({ message: "Không tìm thấy nghệ sĩ" })
        }
        const result = await fixAlbum(album_name, artist_id, album_id);
        if (!result) {
            return res.status(400).json({ message: "Không thể update Album" });
        }
        return res.status(200).json({ message: "Update album thành công" })

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Lỗi server" });
    }

}

export const deleteAlbum = async (req, res) => {
    const { album_id } = req.params;
    try {
        const exist = await findAlbumDetail(album_id);
        if (exist.length === 0) {
            return res.status(404).json({ message: "Không tìm thấy album" });
        }
        const result = await removeAlbum(album_id);
        if (!result) {
            return res.status(400).json({ message: "Không thể xóa album" });
        }
        return res.status(200).json({ message: "Xóa album thành công" })

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Lỗi server" });
    }
}