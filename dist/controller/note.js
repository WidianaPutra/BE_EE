import { prisma } from "../libs/prisma";
import { Logger } from "../events/logger";
import { trim } from "../libs/trim";
async function AddNewNote(req, res) {
    const { title, note, userId } = req.body;
    if (!trim([title, note, userId])) {
        Logger({
            IP: req.ip,
            service: "NOTE",
            status: "WARNING",
            detail: `Data isn't complete`,
        });
        return res
            .status(400)
            .json({ error: { detail: "title and note required" } });
    }
    try {
        const existingUser = await prisma.user.findUnique({
            where: {
                id: userId,
            },
        });
        if (!existingUser) {
            Logger({
                IP: req.ip,
                service: "NOTE",
                status: "WARNING",
                detail: `Attempt to create note with invalid userId`,
            });
            return res.status(404).json({ error: { detail: "UserId not found" } });
        }
        const noteData = await prisma.note.create({
            data: {
                userId,
                title,
                note,
            },
        });
        Logger({
            IP: req.ip,
            service: "NOTE",
            status: "WARNING",
            detail: `Note with id: ${noteData.id} was successfully created`,
        });
        return res.status(201).json({
            data: noteData,
        });
    }
    catch (err) {
        Logger({
            IP: req.ip,
            service: "NOTE",
            status: "FATAL",
            detail: "Internal server error",
        });
        return res.status(500).json({ message: "Internal server error" });
    }
}
async function GetAllNoteDatas(req, res) {
    const { search, user, today } = req.query;
    let prismaQuery = {};
    try {
        if (search) {
            prismaQuery = {
                ...prismaQuery,
                OR: [
                    {
                        title: {
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
        const noteData = await prisma.note.findMany({
            where: prismaQuery,
            include: {
                User: user == "true",
            },
        });
        if (!noteData) {
            Logger({
                IP: req.ip,
                service: "NOTE",
                status: "WARNING",
                detail: `Attempt to get non-existen note data`,
            });
            return res.status(404).json({
                error: {
                    details: "Note datas not found",
                },
            });
        }
        Logger({
            IP: req.ip,
            service: "NOTE",
            status: "SUCCESS",
            detail: `Sucessfully returned note datas`,
        });
        return res.status(200).json({
            data: noteData,
        });
    }
    catch (err) {
        Logger({
            IP: req.ip,
            service: "NOTE",
            status: "FATAL",
            detail: "Internal server error",
        });
        return res.status(500).json({ message: "Internal server error" });
    }
}
async function GetNoteDataByUserId(req, res) {
    const { search, user, today } = req.query;
    let prismaQuery = {};
    try {
        if (search) {
            prismaQuery = {
                ...prismaQuery,
                OR: [
                    {
                        title: {
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
        const noteData = await prisma.note.findMany({
            where: {
                userId: req.params.userId,
                ...prismaQuery,
            },
            include: {
                User: user == "true",
            },
        });
        if (!noteData) {
            Logger({
                IP: req.ip,
                service: "NOTE",
                status: "WARNING",
                detail: `Attempt to get non-existen note data`,
            });
            return res.status(404).json({
                error: {
                    details: "Note datas not found",
                },
            });
        }
        Logger({
            IP: req.ip,
            service: "NOTE",
            status: "SUCCESS",
            detail: `Sucessfully returned note datas`,
        });
        return res.status(200).json({
            data: noteData,
        });
    }
    catch (err) {
        Logger({
            IP: req.ip,
            service: "NOTE",
            status: "FATAL",
            detail: "Internal server error",
        });
        return res.status(500).json({ message: "Internal server error" });
    }
}
async function GetNoteByNoteId(req, res) {
    const { noteId } = req.params;
    try {
        const noteData = await prisma.note.findUnique({
            where: {
                id: noteId,
            },
        });
        if (!noteData) {
            Logger({
                IP: req.ip,
                service: "NOTE",
                status: "WARNING",
                detail: `Attempt to get non-existen note data`,
            });
            return res.status(404).json({ error: { detail: "Data not found" } });
        }
        Logger({
            IP: req.ip,
            service: "NOTE",
            status: "SUCCESS",
            detail: `Sucessfully returned note datas`,
        });
        return res.status(200).json({ data: noteData });
    }
    catch (err) {
        Logger({
            IP: req.ip,
            service: "NOTE",
            status: "FATAL",
            detail: "Internal server error",
        });
        return res.status(500).json({ message: "Internal server error" });
    }
}
async function DeleteNote(req, res) {
    const { noteId } = req.query;
    try {
        if (typeof noteId != "string") {
            Logger({
                IP: req.ip,
                service: "NOTE",
                status: "WARNING",
                detail: `Attempt to delete without note id`,
            });
            return res
                .status(400)
                .json({ error: { detail: "NoteId as paramter required" } });
        }
        const noteData = await prisma.note.delete({
            where: {
                id: noteId,
            },
        });
        Logger({
            IP: req.ip,
            service: "NOTE",
            status: "SUCCESS",
            detail: `The note data was uccessfully deleted`,
        });
        return res.status(200).json({
            data: noteData,
        });
    }
    catch (err) {
        Logger({
            IP: req.ip,
            service: "NOTE",
            status: "FATAL",
            detail: "Internal server error",
        });
        return res.status(500).json({ message: "Internal server error" });
    }
}
async function UpdateNote(req, res) {
    const { noteId } = req.query;
    try {
        if (typeof noteId != "string") {
            Logger({
                IP: req.ip,
                service: "NOTE",
                status: "WARNING",
                detail: `Attempt to delete without note id`,
            });
            return res
                .status(400)
                .json({ error: { detail: "NoteId as paramter required" } });
        }
        let data = {};
        const { title, note } = req.body;
        if (typeof title === "string" && title.trim() != "")
            data = { ...data, title };
        if (typeof note === "string" && note.trim() != "")
            data = { ...data, note };
        const noteData = await prisma.note.update({
            where: {
                id: noteId,
            },
            data,
        });
        Logger({
            IP: req.ip,
            service: "NOTE",
            status: "SUCCESS",
            detail: `Note with id ${noteData.id} was successfuly updated`,
        });
        return res.status(200).json({
            data: noteData,
        });
    }
    catch (err) {
        Logger({
            IP: req.ip,
            service: "NOTE",
            status: "FATAL",
            detail: "Internal server error",
        });
        return res.status(500).json({ message: "Internal server error" });
    }
}
export { AddNewNote, GetAllNoteDatas, GetNoteDataByUserId, GetNoteByNoteId, DeleteNote, UpdateNote, };
