import express from "express";
import { getFollowedArtist, getLikedSong, postFollowArtist, postLikeSong, postUnfollowArtist, postUnlikeSong } from "../controllers/socialController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();
//
router.post("/me/:song_id/like", verifyToken, postLikeSong)
router.delete("/me/:song_id/unlike", verifyToken, postUnlikeSong)
router.get("/me/liked-song", verifyToken, getLikedSong)
//
router.post("/me/:artist_id/follow", verifyToken, postFollowArtist)
router.delete("/me/:artist_id/unfollow", verifyToken, postUnfollowArtist)
router.get("/me/followed-artist", verifyToken, getFollowedArtist)

export default router;
