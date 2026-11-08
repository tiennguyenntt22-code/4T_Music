import { likeSong, unlikeSong, findLikedSong } from "../model/socialModel.js";
import { followArtist, unfollowArtist, findFollowedArtist } from "../model/socialModel.js";

export const postLikeSong = async (req, res) => {
    try {
        const user = req.user;
        const { song_id } = req.params;

        await likeSong(user.user_id, song_id);
        return res.status(201).json({ message: "Like thành công" });
    } catch (error) {
        if (error.code === "ER_DUP_ENTRY") {
            return res.status(409).json({ message: "Bài hát đã được thích" })
        }
        if (error.code === "ER_NO_REFERENCED_ROW_2") {
            return res.status(404).json({ message: "Bài hát không tồn tại" });
        }
        console.error("Lỗi khi gọi postLikeSong", error);
        return res.status(500).json({ message: "Lỗi server" });
    }
}

export const postUnlikeSong = async (req, res) => {
    try {
        const user = req.user;
        const { song_id } = req.params;
        const affected = await unlikeSong(user.user_id, song_id);
        if (affected === 0) {
            return res.status(404).json({ message: "Bạn chưa like bài này" });
        }
        return res.status(200).json({ message: "Unlike thành công" });
    } catch (error) {
        console.error("Lỗi khi gọi postUnlikeSong", error);
        return res.status(500).json({ message: "Lỗi server" });
    }
}

export const getLikedSong = async (req, res) => {
    try {
        const user = req.user;
        const result = await findLikedSong(user.user_id);
        if (result.length === 0) {
            return res.status(200).json({ message: "Chưa Like bài hát nào!", result });
        }
        return res.status(200).json({ message: "Danh sách bài hát yêu thích", result });
    } catch (error) {
        console.error("Lỗi khi gọi getLikedSong", error);
        return res.status(500).json({ message: "Lỗi server" });
    }

}

export const postFollowArtist = async (req, res) => {
    try {
        const user = req.user;
        const { artist_id } = req.params;

        await followArtist(user.user_id, artist_id);
        return res.status(201).json({ message: "Follow thành công" });
    } catch (error) {
        if (error.code === "ER_DUP_ENTRY") {
            return res.status(409).json({ message: "Nghệ sĩ đã được follow" })
        }
        if (error.code === "ER_NO_REFERENCED_ROW_2") {
            return res.status(404).json({ message: "Nghệ sĩ không tồn tại" })
        }
        console.error("Lỗi khi gọi postFollowArtist", error);
        return res.status(500).json({ message: "Lỗi server" });
    }
}

export const postUnfollowArtist = async (req, res) => {
    try {
        const user = req.user;
        const { artist_id } = req.params;
        const affected = await unfollowArtist(user.user_id, artist_id);
        if (affected === 0) {
            return res.status(404).json({ message: "Bạn chưa follow nghệ sĩ này" });
        }
        return res.status(200).json({ message: "Unfollow thành công" });
    } catch (error) {
        console.error("Lỗi khi gọi postUnfollowArtist", error);
        return res.status(500).json({ message: "Lỗi server" });
    }
}

export const getFollowedArtist = async (req, res) => {
    try {
        const user = req.user;
        const result = await findFollowedArtist(user.user_id);
        if (result.length === 0) {
            return res.status(200).json({ message: "Chưa Follow nghệ sĩ nào!" });
        }
        return res.status(200).json({ message: "Danh sách nghệ sĩ yêu thích!", result });
    } catch (error) {
        console.error("Lỗi khi gọi getFollowedArtist", error);
        return res.status(500).json({ message: "Lỗi server" });
    }
}