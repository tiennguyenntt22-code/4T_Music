import express from "express";
import {
  getAllSong,
  postSong,
  updateSong,
  deleteSong,
  getSongBySongName,
  getSongById,
  getSongByArtistId,
} from "../controllers/songsControllers.js";
const router = express.Router();

router.get("/", getAllSong);
router.get("/name/:song_name", getSongBySongName);
router.get("/artist/:artist_id", getSongByArtistId);
router.get("/:song_id", getSongById);

router.post("/", postSong);

router.put("/:id", updateSong);

router.delete("/:song_id", deleteSong);

export default router;
