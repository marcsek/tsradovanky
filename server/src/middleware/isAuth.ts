import { MiddlewareFn } from "type-graphql";
import Context from "../types/context";
import { ApolloError } from "apollo-server-express";

export const isAuth: MiddlewareFn<Context> = async ({ context }, next) => {
  if (!context.req.cookies.accessToken) {
    throw new ApolloError("not authenticated");
  }

  return next();
};
