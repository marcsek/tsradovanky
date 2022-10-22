import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import express_graphql from "express-graphql";
import { buildSchema } from "graphql";

dotenv.config();

let schema = buildSchema(``);

const app: Express = express();
const port = process.env.PORT || 3001;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
