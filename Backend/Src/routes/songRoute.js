import express from 'express';
import { getAllSong, postSong, updateSong, deleteSong, getSongBySongName, getSongById, getSongByArtistId } from '../controllers/songControllers.js';
const router = express.Router();


router.get("/", getAllSong);
router.get("/name/:song_name", getSongBySongName);
router.get("/:song_id", getSongById);
router.get("/id/:artist_id", getSongByArtistId) 

router.post("/", postSong);

router.put("/:id", updateSong);

router.delete("/:id", deleteSong);

export default router;