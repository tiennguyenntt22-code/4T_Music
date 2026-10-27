import { findAll, findById } from "../model/artistsModel.js";

export const getAllArtists = async (req, res) => {
  try {
    const artists = await findAll();
    res.status(200).json(artists);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const getArtistById = async (req, res) => {
  try {
    const artists = await findById(req.params.artist_id);
    if (!artists)
      return res.status(404).json({ message: "Không tìm thấy nghệ sĩ" });
    res.status(200).json(artists);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};
