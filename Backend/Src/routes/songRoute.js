import express from 'express';
import { getAllSong, postSong, updateSong, deleteSong, getSongBySongName, getSongById, getSongByArtistId, getSongByArtistName, getSongByAlbumId, getSongByAlbumName } from '../controllers/songControllers.js';
const router = express.Router();


router.get("/", getAllSong);
router.get("/:song_id", getSongById);
router.get("/name/:song_name", getSongBySongName);
// Lấy nhạc theo Artist
router.get("/:artist_id", getSongByArtistId)
router.get("/name/:artist_name", getSongByArtistName)
// Lấy nhạc theo Album
router.get("/:album_id", getSongByAlbumId)
router.get("/name/:album_name", getSongByAlbumName)

router.post("/", postSong);

router.put("/:id", updateSong);

router.delete("/:id", deleteSong);

export default router;