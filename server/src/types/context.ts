import { Request, Response } from "express";

export default interface Context {
  req: Request;
  res: Response;
  userID?: string;
}

export interface FileUploadContext extends Context {
  savedFile: string | null;
}
