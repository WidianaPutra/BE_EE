import express from "express";
import session from "express-session";
import env from "dotenv";
import cors from "cors";
import { corsConfig } from "./config/cors";
import { sessionConfig } from "./config/session";
env.config();

// router
import AuthRouter from "./routes/auth";
import UserRouter from "./routes/user";
import NoteRouter from "./routes/note";

const app = express();
const PORT = process.env.SERVER_PORT || 3000;
app.use(cors(corsConfig));
app.use(session(sessionConfig));
app.use(express.json());

app.use("/api", AuthRouter);
app.use("/api", UserRouter);
app.use("/api", NoteRouter);

app.listen(PORT, () => console.log(`server running on port: ${PORT}`));
