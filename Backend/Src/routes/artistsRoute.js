import express from "express";
import {
  getAllArtists,
  getArtistById,
} from "../controllers/artistsControllers.js";

const router = express.Router();

router.get("/", getAllArtists);

router.get("/:artist_id", getArtistById);

export default router;
