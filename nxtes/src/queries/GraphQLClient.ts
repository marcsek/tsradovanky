import { GraphQLClient } from "graphql-request";
import { GraphQLResponse } from "graphql-request/dist/types";

const API_URL = "http://localhost:3001/graphql";

const graphQLClient = new GraphQLClient(API_URL, {
  errorPolicy: "ignore",
  credentials: "include",
  mode: "cors",
  headers: { "apollo-require-preflight": "true" },
  responseMiddleware(response) {
    if (response instanceof Error) {
      const error: GraphQLResponse = JSON.parse(JSON.stringify(response, undefined, 2));
      console.log(error);
      throw new Error(error.response.errors[0].message, { cause: error.response.errors[0].extensions.code });
    }
  },
});

export default graphQLClient;
