import jwt from "jsonwebtoken";
import userModel from "../../DB/models/user.model.js";
import { AppError, asyncHandler } from "../Utils/errorHandling.js";


export const auth = () => {
  return asyncHandler(async (req, res, next) => {
    const { token } = req.headers;
    if (!token) {
      return next(new AppError("token not found", 404));
    }
    if (!token.startsWith(process.env.SecretKey)) {
      return next(new AppError("invalid secret key", 400));
    }
    const mainToken = token.split(process.env.SecretKey)[1];
    const decoded = jwt.verify(mainToken, process.env.signature);
    if (!decoded?.id) {
      return next(new AppError("invalid token payload", 400));
    }
    const user = await userModel.findById(decoded.id);
    if (!user) {
      return next(new AppError("user not found", 404));
    }
    req.user = user;
    next();
  });
};
