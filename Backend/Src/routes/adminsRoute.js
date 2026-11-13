import express from "express";
import { banUser, getUserListByRole, getUserListByStatus, updateRole } from "../controllers/adminsController.js";
import { isAdmin, verifyToken } from "../middleware/authMiddleware.js";
import { postArtist, updateArtist, deleteArtist } from "../controllers/artistsController.js";
import { postAlbum, updateAlbum, deleteAlbum } from "../controllers/albumsController.js";
import { postSong, updateSong, deleteSongById } from "../controllers/songsController.js";

const router = express.Router();
router.get("/users/role", verifyToken, isAdmin, getUserListByRole);
router.get("/users/status", verifyToken, isAdmin, getUserListByStatus);
router.patch("/users/:user_id/status", verifyToken, isAdmin, banUser);
router.patch("/users/:user_id/role", verifyToken, isAdmin, updateRole);

router.post("/songs", verifyToken, isAdmin, postSong);
router.patch("/songs/:song_id", verifyToken, isAdmin, updateSong);
router.delete("/songs/:song_id", verifyToken, isAdmin, deleteSongById);

router.post("/artists", verifyToken, isAdmin, postArtist);
router.patch("/artists/:artist_id", verifyToken, isAdmin, updateArtist);
router.delete("/artists/:artist_id", verifyToken, isAdmin, deleteArtist);

router.post("/albums", verifyToken, isAdmin, postAlbum);
router.patch("/albums/:album_id", verifyToken, isAdmin, updateAlbum);
router.delete("/albums/:album_id", verifyToken, isAdmin, deleteAlbum);
export default router;