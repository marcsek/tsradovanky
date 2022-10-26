import { Request, Response } from "express";
import { User } from "../model/user.model";

interface Context {
  req: Request;
  res: Response;
  user: User | null;
}

export default Context;
