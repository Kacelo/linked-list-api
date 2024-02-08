import express, { Request, Response, NextFunction } from "express";
import userRoutes from "./routes/userRoutes";
import morgan from "morgan";
import { logger } from "./middleware/logger";
import bodyParser from "body-parser";
import connectUserDB from "./connections/userDB";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middleware/errorMiddleware";
import { authenticate } from "./middleware/authMiddleware";

const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

app.use(cookieParser());
app.use(morgan("tiny"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger);
app.use(cors());
app.use(errorHandler);
app.use(express.json());
connectUserDB();
dotenv.config();
interface UserBasicInfo {
  _id: string;
  username: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: UserBasicInfo | null;
    }
  }
}
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.get("/", (req: Request, res: Response) => {
  try {
    const message = "Welcome to your new API";
    res.send(JSON.stringify(message));
  } catch (error) {
    console.error("FAILED to make request");
  }
});

// app.post("/sign-up", (req, res) => {
//   try {
//     const id = users.length + 1;
//     const email = req.body.email;
//     const password = req.body.password;
//     const username = req.body.username;

//     const newUser = {
//       id:id,
//       email: email,
//       password: password,
//       username: username,
//     };

//     users.push(newUser);
//     res.json(newUser);
//     console.log(users)
//   } catch (error) {}
// });

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
app.use(userRoutes);
app.use("/users", authenticate, userRoutes);
// const users = [
//   {
//     id: 1,
//     email: "",
//     password: "",
//     username: "",
//   },
// ];
