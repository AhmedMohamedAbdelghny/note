import noteModel from "../../../DB/models/note.model.js";
import { AppError, asyncHandler } from "../../Utils/errorHandling.js";


// *******************************createnote*********************************//
export const createnote = asyncHandler(async (req, res, next) => {
    const { title, content } = req.body
    const exist = await noteModel.findOne({ title, createdBy: req.user._id })
    if (exist) {
        return next(new AppError("note already exist", 403))
    }
    const note = await noteModel.create({ title, content, createdBy: req.user._id })
    note ? res.status(201).json({ msg: "done", note }) : next(new AppError("fail", 400))
})

// *******************************updatenote*********************************//
export const updatenote = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    const note = await noteModel.findOne({ _id: id, createdBy: req.user._id })
    if (!note) {
        return next(new AppError("note not exist or you not owner", 402))
    }
    if (req.body.title) {
        if (await noteModel.findOne({ title: req.body.title, createdBy: req.user._id })) {
            return next(new AppError("note already exist", 403))
        }
        note.title = req.body.title
    }
    if (req.body.content) {
        note.content = req.body.content
    }
    await note.save()
    res.status(200).json({ msg: "done", note })
})

// *******************************deletenote*********************************//
export const deletenote = asyncHandler(async (req, res, next) => {
    const { id } = req.params
    const note = await noteModel.findOneAndDelete({ _id: id, createdBy: req.user._id })
    if (!note) {
        return next(new AppError("note not exist or you not owner", 402))
    }
    res.status(201).json({ msg: "done" })
})

// *******************************getnotes*********************************//
export const getnotes = asyncHandler(async (req, res, next) => {
    const notes = await noteModel.find({})
    if (!notes.length) {
        return next(new AppError("not notes found", 404))
    }
    res.status(200).json({ msg: "done", notes })
})

// *******************************getnote*********************************//
export const getnote = asyncHandler(async (req, res, next) => {
    const notes = await noteModel.find({ createdBy: req.user._id })
    if (!notes.length) {
        return next(new AppError("not notes found", 404))
    }
    res.status(200).json({ msg: "done", notes })
})