import express from "express";
import {
    postRegister,
    postLogin
} from "../controllers/authControllder.js";

const router = express.Router();

router.post("/register", postRegister);
router.post("/Login", postLogin);