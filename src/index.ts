import express from "express";
import session from "express-session";
import env from "dotenv";
import cors from "cors";
import { corsConfig } from "./config/cors";
import { sessionConfig } from "./config/session";
import { Logger } from "./events/logger";
env.config();

const app = express();
const PORT = process.env.SERVER_PORT || 3000;
app.use(cors(corsConfig));
app.use(session(sessionConfig));

console.log(PORT);

app.listen(PORT, () => console.log(`server running on port: ${PORT}`));
