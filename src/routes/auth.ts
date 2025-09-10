import express from "express";
import { Login, Register } from "../controller/auth.js";

const router = express.Router();

router.post("/auth/login", Login);
router.post("/auth/register", Register);

export default router;
