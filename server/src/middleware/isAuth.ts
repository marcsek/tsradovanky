import { GraphQLError } from "graphql";
import { MiddlewareFn } from "type-graphql";
import Context from "../types/context";
import { ErrorCodes } from "../utils/customErrors";
import { verifyAccessToken } from "../utils/jwt";

export const isAuth: MiddlewareFn<Context> = async ({ context }, next) => {
  const token = context.req.cookies.jit;

  if (!token) throw new GraphQLError("Not authenticated.", { extensions: { code: ErrorCodes.NOT_AUTHENTICATED } });

  try {
    const payload = verifyAccessToken(token);

    context.userID = (payload as any).userID;
  } catch (err) {
    throw new GraphQLError("Not authenticated.", { extensions: { code: ErrorCodes.NOT_AUTHENTICATED } });
  }

  return next();
};
