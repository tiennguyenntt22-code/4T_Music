import express from "express";
import {
    getFolder,
    patchFolder,
    putFolderPassword,
    postFolderImage
} from "../controllers/foldersController.js";
const router = express.Router();

router.get("/:user_id", getFolder);
router.patch("/:user_id", patchFolder);
router.put("/:user_id/password", putFolderPassword);
router.post("/:user_id/avatar", postFolderImage);

export default router;