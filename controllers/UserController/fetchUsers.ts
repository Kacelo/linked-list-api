import { Request, Response } from "express";
import User from "../../models/users/users";

export const getUsers = (req: Request, res: Response) => {
  res.send("Welcome to your new Users API");
  // logic to fetch and return users from the database
};

export const getUserById = async (req: Request, res: Response) => {
  // logic to fetch and return user by ID from the database
  const userId = req.user?._id;
  const user = await User.findById(userId, "name email");

  if (!user) {
    res.status(400);
  }

  res.status(200).json(user);
};
