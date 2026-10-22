import express from 'express';
import {getAllSong} from '../controllers/songControllers.js';
import {postAllSong} from '../controllers/songControllers.js';
import {updateSong} from '../controllers/songControllers.js';
import {deleteSong} from '../controllers/songControllers.js';
const router = express.Router();


router.get("/",getAllSong);

router.post("/",postAllSong);

router.put("/:id", updateSong);

router.delete("/:id", deleteSong);

export default router;