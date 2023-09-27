import bcrypt from "bcrypt";
import userModel from "../../../DB/models/user.model.js";
import jwt from "jsonwebtoken";
import { AppError, asyncHandler } from "../../Utils/errorHandling.js";


//**************************signUp********************//
export const signUp = asyncHandler(async (req, res, next) => {
  const { name, email, password, age, phone } = req.body;
  const exist = await userModel.findOne({ email: email.toLowerCase() });
  if (exist) {
    return next(new AppError("email is already exist", 401));
  }
  const hash = bcrypt.hashSync(password, +process.env.saltOrRounds)
  const user = await userModel.create({ name, email, password: hash, age, phone })
  if (!user) {
    return next(new AppError("fail", 400));
  }
  res.status(201).json({ msg: "done", user })
});

//**************************signIn******************* *//
export const signIn = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    return next(new AppError("email not exist", 401));
  }
  const match = bcrypt.compareSync(password, user.password)
  if (!match) {
    return next(new AppError("invalid password", 401));
  }
  const token = jwt.sign({ email: user.email, id: user._id }, process.env.signature, { expiresIn: "1year" })
  res.status(200).json({ msg: "done", token })
});

