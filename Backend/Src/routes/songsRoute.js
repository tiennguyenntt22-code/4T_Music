import express from "express";
import {
  getAllSong,
  postSong,
  deleteSong,
  getSongBySongName,
  getSongById,
  getSongByArtistId,
  getSongByArtistName,
  getSongByAlbumId,
  getSongByAlbumName,
  getSongByPlaylist,
} from "../controllers/songsControllers.js";
import { isAdmin, verifyToken } from "../middleware/authMiddleware.js";
const router = express.Router();


router.get("/", getAllSong);
router.get("/:song_id", getSongById);
router.get("/name/:song_name", getSongBySongName);
// Lấy nhạc theo Artist
router.get("/artist/:artist_id", getSongByArtistId)
router.get("/artist/name/:artist_name",verifyToken, getSongByArtistName)
// Lấy nhạc theo Album
router.get("/album/:album_id", getSongByAlbumId)
router.get("/album/name/:album_name", getSongByAlbumName)
// lấy nhạc trong playlist
router.get("/playlist/:playlist_id", verifyToken, getSongByPlaylist)

router.post("/", verifyToken, isAdmin, postSong);

router.delete("/:song_id", verifyToken, isAdmin, deleteSong);

export default router;
