import jwt from "jsonwebtoken";
import { Logger } from "../events/logger";

export const JwtGenerator = async (data: any) => {
  return jwt.sign(data, process.env.JWT_SECRATE!, { expiresIn: "1h" });
};
