import express from "express";
import {

} from "../controllers/artistsController.js";
import { isAdmin, verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();



export default router;
