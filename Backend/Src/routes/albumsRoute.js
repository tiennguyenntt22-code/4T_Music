import express from "express";
import { getAlbumDetail, postSongToAlbum,  postAlbumByArtist} from "../controllers/albumsController.js";
import { isAdmin, verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/:album_id", getAlbumDetail);
router.post("/song/:album_id", verifyToken, isAdmin, postSongToAlbum);
router.post("/artist", verifyToken, postAlbumByArtist);

export default router;

// findAlbumDetail, addAlbum, fixAlbum, removeAlbum, addSongToAlbum,