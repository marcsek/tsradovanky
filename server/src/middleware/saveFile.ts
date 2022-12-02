import { FileUpload } from "graphql-upload";
import { MiddlewareFn } from "type-graphql";
import { FileUploadContext } from "../types/context";
import fs from "fs";

const allowedExtensions = ["jpg", "png", "jpeg"];

export const saveFile: MiddlewareFn<FileUploadContext> = async (action, next) => {
  if (!action.args.input.profileImg) return next();
  const { filename, createReadStream } = (await action.args.input.profileImg) as FileUpload;
  if (!filename || !createReadStream) return next();

  const fileExtension = filename.split(".").at(-1);
  if (!allowedExtensions.includes(fileExtension ?? "")) return next();

  const fileID = Date.now().toString(36) + Math.random().toString(36);

  const generatedName = `${fileID}.${fileExtension}`;

  await new Promise(async (resolve, reject) => {
    createReadStream()
      .pipe(fs.createWriteStream(__dirname + `/../../../public/storage/${generatedName}`))
      .on("finish", () => resolve(true))
      .on("error", () => reject(false));
  });
  action.context.savedFile = generatedName;

  return next();
};
