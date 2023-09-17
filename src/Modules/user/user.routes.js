import { Router } from "express";
import { signIn, signUp } from "./user.controller.js";


const userRouter = Router();


userRouter.post("/signUp", signUp);
userRouter.post("/signIn", signIn);

export default userRouter

