import express from "express";
import {
    getFolder,
    patchFolder,
    putFolderPassword,
    postFolderImage
} from "../controllers/foldersController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
const router = express.Router();

router.get("/me",verifyToken, getFolder);
router.patch("/me",verifyToken, patchFolder);
router.put("/me/password",verifyToken, putFolderPassword);
router.post("/me/avatar",verifyToken, postFolderImage);

export default router;