import express from "express";
import {
  getAllSong,
  postSong,
  updateSong,
  deleteSong,
  getSongById,
} from "../controllers/songsControllers.js";
const router = express.Router();

router.get("/", getAllSong);

router.get("/:song_id", getSongById);

router.post("/", postSong);

router.put("/:id", updateSong);

router.delete("/:id", deleteSong);

export default router;
