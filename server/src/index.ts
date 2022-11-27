import express, { Express } from "express";
import dotenv from "dotenv";
import "reflect-metadata";
import cors, { CorsOptions } from "cors";

import cookieParser from "cookie-parser";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "@apollo/server";
import { GraphQLError } from "graphql";
import { expressMiddleware } from "@apollo/server/express4";
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from "@apollo/server/plugin/landingPage/default";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import http from "http";
import { resolvers } from "./resolvers";
import { PrismaClient } from "@prisma/client";
import { getComplexity, simpleEstimator, fieldExtensionsEstimator } from "graphql-query-complexity";
import { json } from "body-parser";

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
  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    schema,
    plugins: [
      process.env.NODE_ENV === "production"
        ? ApolloServerPluginLandingPageProductionDefault()
        : ApolloServerPluginLandingPageLocalDefault({ footer: false, includeCookies: true }),
      ApolloServerPluginDrainHttpServer({ httpServer }),
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
  app.use(cors(corsOptions));

  await server.start();

  app.use(
    "/graphql",
    cors<cors.CorsRequest>(corsOptions),
    json(),
    expressMiddleware(server, { context: async ({ req, res }) => ({ req, res }) })
  );

  // app.listen({ port }, () => {
  //   console.log(`⚡️[server]: Server is running at https://localhost:3001`);
  // });

  await new Promise<void>(resolve =>
    httpServer.listen({ port }, () => {
      console.log(`⚡️[server]: Server is running at https://localhost:3001`);
      resolve();
    })
  );

  try {
    await prisma.$connect();
  } catch (_err) {
    throw new GraphQLError("Cannot connect to database");
  }
})();
