import {
    findAllPlaylist,
    findAllPlaylistByUser,
    createPlaylist,
    playlistDetail,
    changePlaylist,
    deletePlaylist,
    addSongToPlaylist,
    deleteSongFromPlaylist,
    arrangeSongByName,
    findSongByPlaylist
} from "../model/playlistsModel.js";

export const getAllPlaylist = async (req, res) => {
    try {
        const playlists = await findAllPlaylist();
        return res.status(200).json(playlists);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "lỗi server" });
    }
}

export const getAllPlaylistByUser = async (req, res) => {
    try {
        const playlists = await findAllPlaylistByUser(req.params.user_id);
        return res.status(200).json(playlists);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "lỗi server" });
    }
}

export const postPlaylist = async (req, res) => {
    try {
        const { playlist_description, playlist_name, user_id } = req.body;
        if (!playlist_name?.trim()) {
            return res.status(400).json({ message: "Thiếu tên playlist" });
        }
        if (!user_id) {
            return res.status(400).json({ message: "Thiếu user_id" });
        }
        const playlists = await createPlaylist(playlist_name.trim(), playlist_description || null, user_id);
        return res.status(200).json({ message: "Tạo thành công playlist", playlists })
    }
    catch (error) {
        if (error.code === "ER_NO_REFERENCED_ROW_2") {
            return res.status(404).json({ message: "Người dùng không tồn tại" });
        }
        console.error(error);
        return res.status(500).json({ message: "lỗi server" });
    }
}

export const getPlaylistDetail = async (req, res) => {
    try {
        const playlists = await playlistDetail(req.params.playlist_id);
        if (!playlists) {
            return res.status(404).json({ message: "Không tìm thấy playlist" })
        }
        const songs = await findSongByPlaylist(req.params.playlist_id);
        return res.status(200).json({ playlists, songs });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Lỗi server" });
    }
}

export const putPlaylist = async (req, res) => {
    try {
        const { playlist_id } = req.params;
        const { playlist_name, playlist_description } = req.body;

        if (!playlist_name?.trim()) {
            return res.status(400).json({ message: "Thiếu tên playlist" });
        }

        const affected = await changePlaylist(playlist_name.trim(), playlist_description || null, playlist_id);

        if (affected === 0) {
            return res.status(404).json({ message: "Không tìm thấy playlist" });
        }
        return res.status(200).json({ message: "Cập nhật playlist thành công" });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Lỗi server" });
    }
}

export const removePlaylist = async (req, res) => {
    try {
        const { playlist_id } = req.params;
        const affected = await deletePlaylist(playlist_id);
        if (affected === 0) {
            return res.status(404).json({ message: "Không tìm thấy playlist" });
        }
        return res.status(200).json({ message: "Xóa playlist thành công" });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Lỗi server" });
    }
}

export const postSongToPlaylist = async (req, res) => {
    try {
        if (!req.body.song_id) {
            return res.status(400).json({ message: "Thiếu song id" })
        }
        const affected = await addSongToPlaylist(req.params.playlist_id, req.body.song_id);
        return res.status(201).json({ message: "Thêm bài hát thành công playlist" })
    }
    catch (error) {
        if (error.code === "ER_DUP_ENTRY") {
            return res.status(409).json({ message: "Bài hát đã có trong playlist" });
        }
        if (error.code === "ER_NO_REFERENCED_ROW_2") {
            return res.status(404).json({ message: "Playlist hoặc bài hát không tồn tại" });
        }
        console.error(error);
        return res.status(500).json({ message: "lỗi server" });
    }
}

export const removeSongFromPlaylist = async (req, res) => {
    try {
        const { playlist_id, song_id } = req.params;
        const affected = await deleteSongFromPlaylist(playlist_id, song_id);
        if (affected === 0) {
            return res.status(404).json({ message: "Không tìm thấy bài hát trong playlist" });
        }
        return res.status(200).json({ message: "Xóa bài hát khỏi playlist thành công" });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Lỗi server" });
    }
}

export const sortSongName = async (req, res) => {
    try {
        const songs = await arrangeSongByName(req.params.playlist_id);
        return res.status(200).json({ message: "Sắp xếp theo tên", songs });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Lỗi server" })
    }
}