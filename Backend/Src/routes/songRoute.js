import express from 'express';
import {getAllSong , postSong , updateSong , deleteSong} from '../controllers/songControllers.js';
const router = express.Router();


router.get("/",getAllSong);

router.post("/",postSong);

router.put("/:id", updateSong);

router.delete("/:id", deleteSong);

export default router;