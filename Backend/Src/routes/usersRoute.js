import express from "express";
import {
  getAllUser,
  getUserByAccount,
  getUserByEmail,
  getUserByName,
  getUserById
} from "../controllers/usersController.js";

import { verifyToken, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, isAdmin, getAllUser);
router.get("/id/:user_id", verifyToken, isAdmin, getUserById);
router.get("/account/:user_account", verifyToken, isAdmin, getUserByAccount);
router.get("/email/:user_email", verifyToken, isAdmin, getUserByEmail);
router.get("/name/:user_name", verifyToken, isAdmin, getUserByName);

export default router;
