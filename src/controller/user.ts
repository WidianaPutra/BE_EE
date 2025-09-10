import type { Request, Response } from "express";
import { prisma } from "../libs/prisma";
import { User } from "@prisma/client";
import { Logger } from "../events/logger";
import { withoutPassword } from "../libs/withoutPassword";
import { trim } from "../libs/trim";

async function GetUserDetails(req: Request, res: Response) {
  const { userId } = req.params;
  try {
    const userData = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        Note: req.query.note == "true" ? true : false,
      },
    });

    if (!userData) {
      Logger({
        IP: req.ip,
        service: "USER",
        status: "WARNING",
        detail: `Attempt to get non-existent user data: ${userId}`,
      });
      return res.status(404).json({
        error: {
          details: "User not found",
        },
      });
    }

    Logger({
      IP: req.ip,
      service: "USER",
      status: "SUCCESS",
      detail: `Sucessfully returned user data: ${userData}`,
    });
    return res.status(200).json({
      data: {
        ...withoutPassword(userData),
      },
    });
  } catch (err) {
    Logger({
      IP: req.ip,
      service: "USER",
      status: "FATAL",
      detail: "Internal server error",
    });
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function GetAllUsers(req: Request, res: Response) {
  const { search, note, today } = req.query;
  let prismaQuery = {};
  try {
    if (search) {
      prismaQuery = {
        ...prismaQuery,
        OR: [
          {
            email: {
              contains: typeof search === "string" ? search : "",
            },
          },
        ],
      };
    }

    if (today === "true") {
      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999);

      prismaQuery = {
        ...prismaQuery,
        createdAt: {
          gte: startOfDay,
          lte: endOfDay,
        },
      };
    }

    const userDatas = await prisma.user.findMany({
      where: prismaQuery,
      include: {
        Note: note == "true",
      },
    });
    if (!userDatas) {
      Logger({
        IP: req.ip,
        service: "USER",
        status: "WARNING",
        detail: `Attempt to get non-existen user data`,
      });
      return res.status(404).json({
        error: {
          details: "User datas not found",
        },
      });
    }

    Logger({
      IP: req.ip,
      service: "USER",
      status: "SUCCESS",
      detail: `Sucessfully returned user datas`,
    });
    return res.status(200).json({
      data: userDatas,
    });
  } catch (err) {
    Logger({
      IP: req.ip,
      service: "USER",
      status: "FATAL",
      detail: "Internal server error",
    });
    return res.status(500).json({ message: "Internal server error" });
  }
}

export { GetAllUsers, GetUserDetails };
