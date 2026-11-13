import express from "express";
import { searchAPI } from "../controllers/searchController.js";

const router = express.Router();
router.get("/", searchAPI);
export default router;
