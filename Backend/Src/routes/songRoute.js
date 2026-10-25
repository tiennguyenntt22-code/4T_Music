import express from 'express';
import {getAllSong , postAllSong , updateSong , deleteSong} from '../controllers/songControllers.js';
const router = express.Router();


router.get("/",getAllSong);

router.post("/",postAllSong);

router.put("/:id", updateSong);

router.delete("/:id", deleteSong);

export default router;