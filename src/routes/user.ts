import express from "express";
const router = express.Router();
import { GetAllUsers, GetUserDetails } from "../controller/user.js";
import { authorization } from "../middleware/authorization.js";

router.get("/user/:userId", [authorization], GetUserDetails);
router.get("/user", [authorization], GetAllUsers);

export default router;
