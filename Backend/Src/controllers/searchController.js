import { searchAlbum, searchArtist, searchSong } from "../model/searchModel.js";

export const searchAPI = async (req, res) => {
    try {
        const q = (req.query.q || "").trim(); // lấy q có trong URL, nếu không có q -> trả về "" -> (!q) = true -> không nhảy 400
        if (!q) {                                 // nếu không trả về "" thì " khoảng trống " -> search trả về lung tung
            return res.status(400).json({ message: "Vui làm nhập tìm kiếm ..." });
        }
        const songs = await searchSong(q);
        const artists = await searchArtist(q);
        const albums = await searchAlbum(q);
        const result = { songs, artists, albums }
        return res.status(200).json({ message: "Tìm kiếm thành công", result })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Lỗi khi gọi searchAPI" })
    }
}