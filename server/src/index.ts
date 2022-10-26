import express, { Express } from "express";
import dotenv from "dotenv";
import "reflect-metadata";
import cors from "cors";

import cookieParser from "cookie-parser";
import { buildSchema } from "type-graphql";
import { ApolloServer, ApolloError } from "apollo-server-express";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { resolvers } from "./resolvers";
import { verifyJwt } from "./utils/jwt";
import { User } from "./model/user.model";
import Context from "./types/context";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

dotenv.config();
const port = process.env.PORT || 3001;
const corsOptions = {
  origin: "*",
  credentials: true,
};

(async () => {
  const schema = await buildSchema({
    resolvers,
  });

  const app: Express = express();
  app.use(cookieParser());
  app.use(cors(corsOptions));

  const server = new ApolloServer({
    schema,
    context: (ctx: Context) => {
      const context = ctx;
      if (ctx.req.cookies.accessToken) {
        const user = verifyJwt<User>(context.req.cookies.accessToken);
        context.user = user;
      }

      return context;
    },
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  });

  await server.start();

  server.applyMiddleware({ app });

  app.listen({ port }, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:3001`);
  });

  try {
    await prisma.$connect();
  } catch (_err) {
    throw new ApolloError("Cannot connect to database");
  }
})();
