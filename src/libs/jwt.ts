import jwt from "jsonwebtoken";
import { Logger } from "../events/logger";

const JWT_SECRATE = process.env.JWT_SECRATE!;

export const JwtGenerator = async (data: any) => {
  return jwt.sign(data, JWT_SECRATE, { expiresIn: "1h" });
};

export const DecodeToken = (data: string) => {
  return jwt.verify(data, JWT_SECRATE) as {
    userId: string;
    date: String | Date;
  };
};
