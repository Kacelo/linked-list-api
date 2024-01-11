import express, { Request, Response, NextFunction } from "express";
import userRoutes from "./routes/userRoutes";
import morgan from "morgan";
import { logger } from "./middleware/logger";
import bodyParser from "body-parser";
const cors = require("cors");
// create an instance of express in the form of app

const app = express();
app.use("/api", userRoutes);
app.use(morgan("tiny"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger);
app.use(cors());
// custom port number
const PORT = 5000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  try {
    const message = "Welcome to your new API";
    res.send(JSON.stringify(message));
  } catch (error) {
    console.error("FAILED to make request");
  }
});

app.post("/sign-up", (req, res) => {
  try {
    const id = users.length + 1;
    const email = req.body.email;
    const password = req.body.password;
    const username = req.body.username;

    const newUser = {
      id:id,
      email: email,
      password: password,
      username: username,
    };

    users.push(newUser);
    res.json(newUser);
    console.log(users)
  } catch (error) {}
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

const users = [
  {
    id: 1,
    email: "",
    password: "",
    username: "",
  },
];
