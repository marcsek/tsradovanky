import { FileUpload } from "graphql-upload";
import { MiddlewareFn } from "type-graphql";
import { FileUploadContext } from "../types/context";
import fs from "fs";
import { GraphQLError } from "graphql";
import { ErrorCodes } from "../utils/customErrors";
import { PrismaClient } from "@prisma/client";

const allowedExtensions = ["jpg", "png", "jpeg"];

const prisma = new PrismaClient();

//FIXME: uploading file over size limit throws error but still saves the img

export const fileUpload: MiddlewareFn<FileUploadContext> = async (action, next) => {
  const directoryPath = __dirname + `/../../../public/storage/`;

  if (!action.args.input.profileImg) return next();
  const { filename, createReadStream } = (await action.args.input.profileImg) as FileUpload;
  if (!filename || !createReadStream)
    throw new GraphQLError("Couldn't process this file.", { extensions: { code: ErrorCodes.FILE_PARSING_FAILED } });

  const fileExtension = filename.split(".").at(-1);
  if (!allowedExtensions.includes(fileExtension ?? ""))
    throw new GraphQLError("Wrong file extension.", { extensions: { code: ErrorCodes.FILE_EXTENSION_NOT_SUPPORTED } });

  const fileID = Date.now().toString(36) + Math.random().toString(36);

  const generatedName = `${fileID}.${fileExtension}`;

  await new Promise(async (resolve, reject) => {
    const readStream = createReadStream().on("error", error => {
      reject(error);
    });

    readStream
      .pipe(fs.createWriteStream(directoryPath + generatedName))
      .on("finish", () => resolve(true))
      .on("error", error => reject(error));
  }).catch(error => {
    if ((error as Error).name === "PayloadTooLargeError") {
      throw new GraphQLError("Max. file size exceeded.", { extensions: { code: ErrorCodes.FILE_SIZE_EXCEEDED } });
    }
    throw new GraphQLError((error as Error).message, { extensions: { code: ErrorCodes.INTERNAL_SERVER_ERROR } });
  });

  const profileImgQuery = await prisma.user.findUnique({ where: { id: action.context.userID! }, select: { profileImg: true } });

  if (profileImgQuery && profileImgQuery.profileImg) {
    const { profileImg: oldProfileImg } = profileImgQuery;
    fs.unlink(directoryPath + oldProfileImg, err => {
      if (err) console.log(`Failed to delete oldProfilePicture with name ${oldProfileImg}`);
    });
  }

  action.context.savedFile = generatedName;

  return next();
};
