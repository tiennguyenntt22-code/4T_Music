import express from 'express'
import { isAdmin, verifyToken } from '../middleware/authMiddleware.js'
import {
    deleteSongById,
    getAllSong,
    getSongByAlbumName,
    getSongByArtistName,
    getSongById,
    getSongBySongName,
    postSong
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
router.get("/:song_id", getSongById);
router.get("/name/:song_name", getSongBySongName);
router.get("/artist/name/:artist_name", getSongByArtistName);
router.get("/album/name/:album_name", getSongByAlbumName);
router.post("/admin", verifyToken, isAdmin, postSong);
router.delete("/admin/:song_id", verifyToken, isAdmin, deleteSongById);

export default router;