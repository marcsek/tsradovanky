import express, { Express } from "express";
import dotenv from "dotenv";
import "reflect-metadata";
import cors, { CorsOptions } from "cors";

import cookieParser from "cookie-parser";
import { buildSchema } from "type-graphql";
import { ApolloServer, ApolloError } from "apollo-server-express";
import { ApolloServerPluginLandingPageGraphQLPlayground, ApolloServerPluginLandingPageProductionDefault } from "apollo-server-core";
import { resolvers } from "./resolvers";
import { verifyJwt } from "./utils/jwt";
import { User } from "./model/user.model";
import Context from "./types/context";
import { PrismaClient } from "@prisma/client";
import { getComplexity, simpleEstimator, fieldExtensionsEstimator } from "graphql-query-complexity";

const prisma = new PrismaClient();

dotenv.config();
const port = process.env.PORT || 3001;
const corsOptions: CorsOptions = {
  origin: "http://localhost:3006",
  credentials: true,
};

(async () => {
  const schema = await buildSchema({
    resolvers,
  });

  const app: Express = express();

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
    debug: false,
    plugins: [
      process.env.NODE_ENV === "production" ? ApolloServerPluginLandingPageProductionDefault() : ApolloServerPluginLandingPageGraphQLPlayground(),
      {
        requestDidStart: () =>
          ({
            didResolveOperation({ request, document }: any) {
              const complexity = getComplexity({
                schema,
                operationName: request.operationName,
                query: document,
                variables: request.variables,
                estimators: [fieldExtensionsEstimator(), simpleEstimator({ defaultComplexity: 1 })],
              });
              if (complexity > 20) {
                throw new Error(`Sorry, too complicated query! ${complexity} is over 20 that is the max allowed complexity.`);
              }
            },
          } as any),
      },
    ],
    // cache: "bounded",
  });

  app.use(cookieParser());
  await server.start();

  server.applyMiddleware({ app, cors: corsOptions });

  app.listen({ port }, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:3001`);
  });

  try {
    await prisma.$connect();
  } catch (_err) {
    throw new ApolloError("Cannot connect to database");
  }
})();
