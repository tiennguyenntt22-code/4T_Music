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

const router = express.Router();

router.get("/", getAllPlaylist);
router.get("/user/:user_id", getAllPlaylistByUser);
router.get("/detail/:playlist_id", getPlaylistDetail);
// 
router.post("/", postPlaylist);
router.post("/song/:playlist_id", postSongToPlaylist);
// 
router.delete("/:playlist_id", removePlaylist);
router.delete("/song/:playlist_id/:song_id", removeSongFromPlaylist);
//
router.get("/:playlist_id/sort-by-song_name", sortSongName);
router.put("/:playlist_id", putPlaylist);
export default router;
