import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/users/users";
import asyncHandler from "express-async-handler";
import { AuthenticationError } from "./errorMiddleware";

const authenticate = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      let token = req.cookies.jwt;
      if (!token) {
        res.status(401);
        throw new AuthenticationError("Token not found");
      }
      const jwtSecret = process.env.JWT_SECRET || "";
      const decoded = jwt.verify(token, jwtSecret) as JwtPayload;

      if (!decoded || !decoded.userId) {
        res.status(401);
        throw new AuthenticationError("UserId not found");
      }
      const user = await User.findById(decoded.userId, "_id name email");
      if (!user) {
        res.status(401);
        throw new AuthenticationError("User not found");
      }
      req.user = user;
      next();
    } catch (error) {
      res.status(401);
      throw new AuthenticationError("Invalid token");
    }
  }
);
export { authenticate };
