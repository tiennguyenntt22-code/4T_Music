import {
  findAll,
  create,
  xoa,
  findSongById,
  findSongBySongName,
  findSongByArtistId,
  findSongByAlbumId,
  findSongByArtistName,
  findSongByAlbumName,
  findSongByPlaylist,
} from "../model/songsModel.js";

export const getAllSong = async (req, res) => {
  try {
    const songs = await findAll();
    res.status(200).json(songs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server" });
  }
};

export const getSongById = async (req, res) => {
  try {
    const songs = await findSongById(req.params.song_id);
    if (!songs) {
      return res.status(404).json({ message: "Không tìm thấy bài hát" });
    }
    return res.status(200).json(songs);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const getSongBySongName = async (req, res) => {
  try {
    const songs = await findSongBySongName(req.params.song_name);
    if (songs.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy bài hát" });
    }
    return res.status(200).json(songs);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const getSongByArtistId = async (req, res) => {
  try {
    const songs = await findSongByArtistId(req.params.artist_id);
    if (songs.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy bài hát nào" });
    }
    return res.status(200).json(songs);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};


export const getSongByArtistName = async (req, res) => {
  try {
    const songs = await findSongByArtistName(req.params.artist_name);
    if (songs.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy bài hát nào" })
    }
    return res.status(200).json(songs);
  }
  catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Lỗi server" })
  }
}

export const getSongByAlbumId = async (req, res) => {
  try {
    const songs = await findSongByAlbumId(req.params.album_id);
    if (songs.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy bài hát nào" })
    }
    return res.status(200).json(songs);
  }
  catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Lỗi server" })
  }
}


export const getSongByAlbumName = async (req, res) => {
  try {
    const songs = await findSongByAlbumName(req.params.album_name);
    if (songs.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy bài hát nào" })
    }
    return res.status(200).json(songs);
  }
  catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Lỗi server" })
  }
}

export const getSongByPlaylist = async (req, res) => {
  try {
    const songs = await findSongByPlaylist(req.params.playlist_id);
    if (songs.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy bài hát nào" })
    }
    return res.status(200).json(songs);
  }
  catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Lỗi server" })
  }
}


export const postSong = async (req, res) => {
  try {
    const { song_name, duration } = req.body;
    if (!song_name) {
      return res.status(400).json({ message: "Thiếu tiêu đề bài hát" });
    }
    await create({ song_name, duration });
    return res.status(200).json({ message: "Thêm bài hát thành công" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};

export const deleteSong = async (req, res) => {
  try {
    const affected = await xoa(req.params.song_id);
    if (affected === 0) {
      return res.status(404).json({ message: "Không tìm thấy bài hát" });
    }
    return res.status(200).json({ message: "Xóa bài hát thành công" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Lỗi server" });
  }
};
