import { Request, Response } from "express";
import User from "../../models/users/users";
export const createUser = (req: Request, res: Response) => {
  // logic to create a new user in the database

  User.create(req.body)
    .then((data) => {
      console.log({ data });
      res.json({ message: "user has been added successfully", data });
    })
    .catch((err) => {
      res.status(400).json({
        message: "unable to add new todo",
        error: err.message,
      });
    });
};
