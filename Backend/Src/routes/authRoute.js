import express from "express";
import {
    postRegister,
    postLogin,
    postLogout,
    postRefresh,
    postResetPassword,
    postForgotPassword,
    postResendVerification,
    getVerifyEmail
} from "../controllers/authController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/register", postRegister);
router.post("/login", postLogin);
router.post("/logout", verifyToken, postLogout);
router.post("/refresh", postRefresh);
router.get("/verify-email", getVerifyEmail);
router.get("/send-verification", verifyToken, postResendVerification);
router.get("/forgot-password", postForgotPassword);
router.get("/reset-password", postResetPassword);
export default router;