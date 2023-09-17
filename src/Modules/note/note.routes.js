import { Router } from "express";
import { auth } from "../../middlewares/auth.js";
import { createnote, deletenote, getnote, getnotes, updatenote } from "./note.controller.js";




const noteRouter = Router();

noteRouter.post("/", auth(), createnote);
noteRouter.put("/:id", auth(), updatenote);
noteRouter.delete("/:id", auth(), deletenote);
noteRouter.get("/", auth(), getnote);
noteRouter.get("/allNotes", getnotes);



export default noteRouter;
