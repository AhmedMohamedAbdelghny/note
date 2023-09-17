import dbConnection from './../../DB/connection.js';
import path from "path";
import { config } from "dotenv";
config({ path: path.resolve("config/.env") });
import { AppError, globalErrorHandel } from "../Utils/errorHandling.js";
import userRouter from "./user/user.routes.js";
import noteRouter from './note/note.routes.js';
const port = process.env.PORT || 3001;

export const initApp = (app, express) => {

    app.get("/", (req, res, next) => {
        return res.status(200).json({ msg: "welcome in my app" })
    })
    app.use(express.json());

    app.use("/api/v1/users", userRouter);
    app.use("/api/v1/notes", noteRouter);


    app.use("*", (req, res, next) => {
        next(new AppError(`inValid path ${req.originalUrl}`, 404));
    });
    app.use(globalErrorHandel);

    dbConnection();
    app.listen(port, () => console.log(`Example app listening on port ${port}!`));
};