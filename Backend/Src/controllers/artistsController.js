import { findAllArtist, findArtistPage, findArtistSong, findArtistAlbum, addArtist, changeArtist, removeArtist } from "../model/artistsModel.js";

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

export const postArtist = async (req, res) => {
  const { artist_name, artist_birth } = req.body;
  try {
    if (!artist_name) {
      return res.status(400).json({ message: "Thiếu tên nghệ sĩ" });
    }
    const result = await addArtist(artist_name, artist_birth);
    if (!result) {
      return res.status(400).json({ message: "Lỗi khi thêm nghệ sĩ" });
    }
    return res.status(201).json({ message: "Thêm nghệ sĩ thành công" });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ message: "Trùng tên nghệ sĩ" })
    }
    return res.status(500).json({ message: "Lỗi server" })
  }
}

export const updateArtist = async (req, res) => {
  const { artist_name, artist_birth } = req.body;
  const { artist_id } = req.params;
  try {
    const exist = await findArtistPage(artist_id);
    if (!exist) {
      return res.status(404).json({ message: "Nghệ sĩ không tồn tại" });
    }
    const result = await changeArtist(artist_name, artist_birth, artist_id);
    if (!result) {
      return res.status(400).json({ message: "Lỗi không thể sửa nghệ sĩ" });
    }
    return res.status(200).json({ message: "Sửa nghệ sĩ thành công" })
  } catch (error) {
    console.error("Lỗi khi gọi updateArtist", error);
    return res.status(500).json({ message: "Lỗi server" })
  }
}

export const deleteArtist = async (req, res) => {
  const { artist_id } = req.params;
  try {
    const exist = await findArtistPage(artist_id);
    if (!exist) {
      return res.status(404).json({ message: "Nghệ sĩ không tồn tại" });
    }
    const result = await removeArtist(artist_id);
    if (!result) {
      return res.status(400).json({ message: "Lỗi không thể xóa nghệ sĩ" });
    }
    return res.status(200).json({ message: "Xóa nghệ sĩ thành công" })
  } catch (error) {
    console.error("Lỗi khi gọi deleteArtist", error);
    return res.status(500).json({ message: "Lỗi server" })
  }
}
