import express from "express";
import {
    getAllArtist,
    getArtistAlbum,
    getArtistPage,
    getArtistSong
} from "../controllers/artistsController.js";

const router = express.Router();

router.get("/", getAllArtist);
router.get("/album/:artist_id", getArtistAlbum);
router.get("/song/:artist_id", getArtistSong);
router.get("/page/:artist_id", getArtistPage);

export default router;
