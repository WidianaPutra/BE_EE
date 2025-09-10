import type { Request, Response } from "express";
import { Logger } from "../events/logger.js";
import { compare, hash } from "bcrypt";
import { trim } from "../libs/trim.js";
import { prisma } from "../libs/prisma.js";
import { JwtGenerator } from "../libs/jwt.js";
import { withoutPassword } from "../libs/withoutPassword.js";
import { User } from "@prisma/client";

const BCRYPT_SALT = process.env.BCRYPT_SALT || 10;

async function Login(req: Request, res: Response) {
  const { email, password } = req.body;
  if (!trim([email, password])) {
    Logger({
      IP: req.ip,
      service: "AUTH",
      status: "WARNING",
      detail: `Email and password required`,
    });
    return res
      .status(400)
      .json({ error: { detail: "email and password required" } });
  }
  try {
    const userData = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!userData) {
      Logger({
        IP: req.ip,
        service: "AUTH",
        status: "WARNING",
        detail: `User doesn't exist`,
      });
      return res.status(404).json({
        error: {
          detail: "User does'nt exist",
        },
      });
    }

    const passwordCompare = await compare(password, userData.password);

    if (!passwordCompare) {
      Logger({
        IP: req.ip,
        service: "AUTH",
        status: "WARNING",
        detail: `Password doesn't match`,
      });
      return res.status(401).json({
        error: {
          detail: "Password doesn't match",
        },
      });
    }

    const jwt = await JwtGenerator({ userId: userData.id, date: new Date() });
    Logger({
      IP: req.ip,
      service: "AUTH",
      status: "SUCCESS",
      detail: `User successfully login ${userData.id}`,
    });
    return res.status(200).json({
      data: {
        token: jwt,
        ...withoutPassword(userData),
      },
    });
  } catch (error) {
    Logger({
      IP: req.ip,
      service: "AUTH",
      status: "FATAL",
      detail: "Internal server error",
    });
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function Register(req: Request, res: Response) {
  const { email, password, username } = req.body;
  let userData: User | null = null;

  if (!trim([email, password, username])) {
    Logger({
      IP: req.ip,
      service: "AUTH",
      status: "WARNING",
      detail: `Email and password required`,
    });
    return res
      .status(400)
      .json({ error: { detail: "email and password required" } });
  }
  try {
    userData = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userData) {
      Logger({
        IP: req.ip,
        service: "AUTH",
        status: "WARNING",
        detail: `Attempt to use existing email: ${email}`,
      });
      return res
        .status(409)
        .json({ error: { detail: "Email already in used" } });
    }

    userData = await prisma.user.create({
      data: {
        email,
        password: await hash(password, 10),
        username,
      },
    });

    if (!userData) {
      Logger({
        IP: req.ip,
        service: "AUTH",
        status: "ERROR",
        detail: `User data doesn't uploaded`,
      });
    }
    const jwt = JwtGenerator({ userId: userData.id, date: new Date() });

    Logger({
      IP: req.ip,
      service: "AUTH",
      status: "SUCCESS",
      detail: `User with email ${userData.email} was successfully created`,
    });
    return res.status(201).json({
      data: {
        token: jwt,
        ...withoutPassword(userData),
      },
    });
  } catch (err) {
    Logger({
      IP: req.ip,
      service: "AUTH",
      status: "FATAL",
      detail: "Internal server error",
    });
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export { Login, Register };
