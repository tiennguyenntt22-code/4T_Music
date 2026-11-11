import { findAllArtist, findArtistPage, findArtistSong, findArtistAlbum } from "../model/artistsModel.js";

export const getAllArtist = async (req, res) => {
  try {
    const result = await findAllArtist();
    return res.status(200).json({ message: "Lấy thành công danh sách nghệ sĩ", result })
  } catch (error) {
    console.error("Lỗi khi gọi getAllArtist", error);
    return res.status(500).json({ message: "Lỗi server" })
  }
}

export const getArtistPage = async (req, res) => {
  const { artist_id } = req.params;
  try {
    const result = await findArtistPage(artist_id);
    if (!result) {
      return res.status(404).json({ message: "Không tìm thấy nghệ sĩ" })
    }
    return res.status(200).json({ message: "Lấy thông tin nghệ sĩ thành công!", result });
  } catch (error) {
    console.error("Lỗi khi gọi getArtistPage", error);
    return res.status(500).json({ message: "Lỗi server" })
  }
}

export const getArtistSong = async (req, res) => {
  const { artist_id } = req.params;
  try {

    const artist = await findArtistPage(artist_id);
    if (!artist) {
      return res.status(404).json({ message: "Nghệ sĩ không tồn tại" })
    }

    const result = await findArtistSong(artist_id);

    return res.status(200).json({ message: "Lấy bài hát của nghệ sĩ thành công", result });
  } catch (error) {
    console.error("Lỗi khi gọi getArtistSong", error);
    return res.status(500).json({ message: "Lỗi server" })
  }
}

export const getArtistAlbum = async (req, res) => {
  const { artist_id } = req.params;
  try {

    const artist = await findArtistPage(artist_id);
    if (!artist) {
      return res.status(404).json({ message: "Nghệ sĩ không tồn tại" })
    }

    const result = await findArtistAlbum(artist_id);

    return res.status(200).json({ message: "Lấy album của nghệ sĩ thành công", result });
  } catch (error) {
    console.error("Lỗi khi gọi getArtistAlbum", error);
    return res.status(500).json({ message: "Lỗi server" })
  }
}
///// Admin quản lí nghệ sĩ