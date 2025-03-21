import express, { Request, Response } from "express";
import "dotenv/config";
import cors from "cors";
import userRoutes from "./routes/user.js";

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());
app.use("/user", userRoutes);

app.get("/", (_req: Request, res: Response) => {
  res.send("Welcome to JWT-101-api! 👋");
});

app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});
