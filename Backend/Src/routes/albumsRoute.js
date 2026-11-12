import express from "express";
import { getAlbumDetail, postAlbum, postSongToAlbum, updateAlbum, deleteAlbum} from "../controllers/albumsController.js";
import { isAdmin, verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/:album_id ", getAlbumDetail);
router.post("/", verifyToken, isAdmin, postAlbum);
router.post("/song/:album_id", verifyToken, isAdmin, postSongToAlbum);
router.patch("/:album_id", verifyToken, isAdmin, updateAlbum);
router.delete("/:album_id", verifyToken, isAdmin, deleteAlbum);

export default router;

// findAlbumDetail, addAlbum, fixAlbum, removeAlbum, addSongToAlbum,