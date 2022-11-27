import { GraphQLError } from "graphql";
import { MiddlewareFn } from "type-graphql";
import Context from "../types/context";
import { verifyAccessToken } from "../utils/jwt";

export const isAuth: MiddlewareFn<Context> = async ({ context }, next) => {
  const token = context.req.cookies.jit;

  if (!token) throw new GraphQLError("not authenticated");

  try {
    const payload = verifyAccessToken(token);

    context.userID = (payload as any).userID;
  } catch (err) {
    console.log(err);
    throw new GraphQLError("not authenticated");
  }

  return next();
};
