import { GraphQLClient, gql } from "graphql-request";
import { UserType } from "../types/user.type";
import { LoginUserParams, RegisterUserParams } from "./types/inputTypes";

const API_URL = "http://localhost:3001/graphql";

const graphQLClient = new GraphQLClient(API_URL, {
  errorPolicy: "ignore",
  credentials: "include",
  mode: "cors",
  responseMiddleware(response) {
    if (response instanceof Error) {
      const error: any = JSON.parse(JSON.stringify(response, undefined, 2));

      throw new Error(error.response.errors[0].message, { cause: error.response.errors[0] });
    }
  },
});

export const loginUser = async (input: LoginUserParams): Promise<boolean> => {
  const { loginUser } = await graphQLClient.request(
    gql`
      mutation loginUser($input: LoginInput!) {
        loginUser(input: $input)
      }
    `,
    { input }
  );

  return loginUser;
};

export const logoutUser = async (): Promise<boolean> => {
  console.log("logout");
  const { logoutUser } = await graphQLClient.request(
    gql`
      mutation {
        logoutUser
      }
    `
  );
  return logoutUser;
};

export const getUser = async (): Promise<UserType> => {
  const { getUser } = await graphQLClient.request(gql`
    query {
      getUser {
        name
        id
        email
      }
    }
  `);

  return getUser;
};

export const registerUser = async (input: RegisterUserParams): Promise<boolean> => {
  const { createUser } = await graphQLClient.request(
    gql`
      mutation loginUser($input: CreateUserInput!) {
        createUser(input: $input) {
          name
        }
      }
    `,
    { input }
  );

  return createUser;
};
