import express from "express";
const router = express.Router();
import { GetAllUsers, GetUserDetails } from "../controller/user";
import { authorization } from "../middleware/authorization";
router.get("/user/:userId", [authorization], GetUserDetails);
router.get("/user", [authorization], GetAllUsers);
export default router;
