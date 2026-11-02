import express from "express";
import {
  getAllPlaylist,
  getAllPlaylistByUser,
  getPlaylistDetail,
  postPlaylist,
  postSongToPlaylist,
  removePlaylist,
  removeSongFromPlaylist,
  sortSongName,
  putPlaylist

} from "../controllers/playlistsController.js";
import { isAdmin, verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/",verifyToken,isAdmin, getAllPlaylist);
router.get("/user/:user_id",verifyToken, getAllPlaylistByUser);
router.get("/detail/:playlist_id",verifyToken, getPlaylistDetail);
// 
router.post("/",verifyToken, postPlaylist);
router.post("/song/:playlist_id",verifyToken, postSongToPlaylist);
// 
router.delete("/:playlist_id",verifyToken, removePlaylist);
router.delete("/song/:playlist_id/:song_id",verifyToken, removeSongFromPlaylist);
//
router.get("/:playlist_id/sort-by-song_name",verifyToken, sortSongName);
router.put("/:playlist_id",verifyToken, putPlaylist);
export default router;
