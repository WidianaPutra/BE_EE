import { Request, Response, NextFunction } from "express";
import { Logger } from "../events/logger.js";
import { DecodeToken } from "../libs/jwt.js";
import { prisma } from "../libs/prisma.js";

export const authorization = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authToken = req.headers["authorization"]?.split(" ") || ["", ""];
  if (authToken[0] != "Bearer" || !authToken) {
    Logger({
      IP: req.ip,
      service: "GENERAL",
      status: "WARNING",
      detail: `Attampt to request without credentials`,
    });
    return res.status(401).json({ error: { detail: "Unauthorized" } });
  }

  let decodedToken: any = null;

  try {
    decodedToken = DecodeToken(authToken[1]);
  } catch (err) {
    //
  }

  if (decodedToken == null) {
    Logger({
      IP: req.ip,
      service: "GENERAL",
      status: "WARNING",
      detail: `Attampt to request without invalid credentials`,
    });
    return res.status(401).json({ error: { detail: "Unauthorized" } });
  }

  const userId = await prisma.user.findUnique({
    where: {
      id: decodedToken?.userId,
    },
  });

  if (!userId) {
    Logger({
      IP: req.ip,
      service: "GENERAL",
      status: "WARNING",
      detail: `Attampt to request without credentials`,
    });
    return res.status(401).json({ error: { detail: "Unauthorized" } });
  }

  return next();
};
