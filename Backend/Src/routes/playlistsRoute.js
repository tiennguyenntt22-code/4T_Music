import express from 'express';
import {
    getAllPlaylist,
    getAllPlaylistByUser,
    postPlaylist,
    getPlaylistDetail,
    putPlaylist,
    removePlaylist,
    removeSongFromPlaylist,
    postSongToPlaylist,
    sortSongName
} from '../controllers/playlistsController.js';
import { isAdmin, verifyToken } from '../middleware/authMiddleware.js';
const router = express.Router();

router.get("/", verifyToken, isAdmin, getAllPlaylist)
router.get("/playlist", verifyToken, getAllPlaylistByUser)
router.post("/name/playlist", verifyToken, postPlaylist)
router.get("/detail/:playlist_id", verifyToken, getPlaylistDetail)
router.put("/:playlist_id", verifyToken, putPlaylist) // 
router.delete("/:playlist_id", verifyToken, removePlaylist) // 
router.delete("/:song_id/:playlist_id", verifyToken, removeSongFromPlaylist)
router.post("/songs/:playlist_id", verifyToken, postSongToPlaylist) // 
router.patch("/:playlist_id/order", verifyToken, sortSongName) // 


export default router