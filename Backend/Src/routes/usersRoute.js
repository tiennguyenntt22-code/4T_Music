import express from "express";
import {
  getAllUser,
  getUserByAccount,
  getUserByEmail,
} from "../controllers/usersControllers.js";
import { getUserById } from "../controllers/usersControllers.js";
const router = express.Router();

router.get("/", getAllUser);
router.get("/id/:user_id", getUserById);
router.get("/account/:user_account", getUserByAccount);
router.get("/email/:user_email", getUserByEmail);

export default router;
