import { Request, Response } from "express";
import { User } from "../model/user.model";

interface Context {
  req: Request;
  res: Response;
  userID?: string;
}

export default Context;
