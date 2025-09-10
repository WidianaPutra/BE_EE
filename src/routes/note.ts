import express from "express";
import { authorization } from "../middleware/authorization.js";
import {
  AddNewNote,
  DeleteNote,
  GetAllNoteDatas,
  GetNoteDataByUserId,
  GetNoteByNoteId,
  UpdateNote,
} from "../controller/note.js";
const router = express.Router();

router.post("/note", [authorization], AddNewNote);
router.get("/note", [authorization], GetAllNoteDatas);
router.get("/user/:userId/note", [authorization], GetNoteDataByUserId);
router.get("/note/:noteId", [authorization], GetNoteByNoteId);
router.delete("/note/:noteId", [authorization], DeleteNote);
router.patch("/note/:noteId", [authorization], UpdateNote);

export default router;
