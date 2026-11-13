import express from 'express'
import { isAdmin, verifyToken } from '../middleware/authMiddleware.js'
import {
    getAllSong,
    getSongByArtistName,
    getSongById,
    getSongBySongName,
} from '../controllers/songsController.js';

//  findAll,
//   findSongById,
//   findSongBySongName,
//   findSongByArtistName,
//   findSongByAlbumName,
//   create,
//   removeSongById,

const router = express.Router();

router.get("/", getAllSong);
router.get("/:song_id", getSongById); // API 2
router.get("/name/:song_name", getSongBySongName);
router.get("/artist/name/:artist_name", getSongByArtistName);

export default router;