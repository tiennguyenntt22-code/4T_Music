import express from "express";
import {
    postRegister,
    postLogin,
    postLogout,
    postRefresh
} from "../controllers/authController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/register", postRegister);
router.post("/login", postLogin);
router.post("/logout", postLogout);
router.post("/refresh", postRefresh);

export default router;