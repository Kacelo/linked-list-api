import { Request, Response } from "express";
import User from "../../models/users/users";
import { clearToken, generateToken } from "../../utils/auth";
// export const createUser = (req: Request, res: Response) => {
//   // logic to create a new user in the database

//   User.create(req.body)
//     .then((data) => {
//       console.log({ data });
//       res.json({ message: "user has been added successfully", data });
//     })
//     .catch((err) => {
//       res.status(400).json({
//         message: "unable to add new todo",
//         error: err.message,
//       });
//     });
// };

const registerUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "The user already exists" });
    }

    // Create the user
    const user = await User.create({
      username,
      email,
      password,
    });

    // Check if user creation was successful
    if (user) {
      generateToken(res, user._id);
      return res.status(201).json({
        id: user._id,
        username: user.username,
        email: user.email,
      });
    } else {
      // If user creation failed for some reason
      return res
        .status(500)
        .json({ message: "An error occurred while creating the user" });
    }
  } catch (error) {
    // Handle unexpected errors
    console.error("An unexpected error occurred:", error);
    return res.status(500).json({ message: "An unexpected error occurred" });
  }
};

const authenticateUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  try {
    if (user && (await user.comparePassword(password))) {
      generateToken(res, user._id);
      res.status(201).json({
        id: user._id,
        name: user.baseModelName,
        email: user.email,
      });
    } else {
      res.status(401).json({ message: "User not found / password incorrect" });
    }
  } catch (error) {
    return res.status(500).json({ message: "An unexpected error occurred" });
  }
};
const logoutUser = (req: Request, res: Response) => {
  try {
    clearToken(res);
    res.status(200).json({ message: "User logged out" });
  } catch (error) {
    return res.status(500).json({ message: "An unexpected error occurred" });
  }
};
export { registerUser, authenticateUser, logoutUser };
