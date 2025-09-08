import express from "express";
import { Login, Register } from "../controller/auth";

const router = express.Router();

router.get("/auth/login", Register);
router.get("/auth/register", Login);

export default router;
