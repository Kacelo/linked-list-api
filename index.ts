import express, { Request, Response, NextFunction } from "express";
import userRoutes from "./routes/userRoutes";
import morgan from "morgan";
import { logger } from "./middleware/logger";
import bodyParser from "body-parser";
// create an instance of express in the form of app

const app = express();
app.use("/api", userRoutes);
app.use(morgan("tiny"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger);
// custom port number
const PORT = 5000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to your new API");
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
