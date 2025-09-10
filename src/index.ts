import express from "express";
import env from "dotenv";
import cors from "cors";
env.config();

// router
import AuthRouter from "./routes/auth.js";
import UserRouter from "./routes/user.js";
import NoteRouter from "./routes/note.js";

const app = express();
const PORT = Number(process.env.SERVER_PORT) || 3000;
app.use(cors());
app.use(express.json());

app.use("/api", AuthRouter);
app.use("/api", UserRouter);
app.use("/api", NoteRouter);

app.listen(PORT, () => console.log(`server running on port: ${PORT}`));
