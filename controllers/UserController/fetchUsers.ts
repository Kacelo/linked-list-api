import { Request, Response } from 'express';

export const getUsers = (req: Request, res: Response) => {
  res.send("Welcome to your new Users API");
    // logic to fetch and return users from the database
  };

  export const getUserById = (req: Request, res: Response) => {
    // logic to fetch and return user by ID from the database
  };