import { gql } from "graphql-request";
import { ListValue } from "../pages/NxtePage/types";
import { UserType } from "../types/user.type";
import graphQLClient from "./GraphQLClient";

interface LoginUserParams {
  email: string;
  password: string;
}

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

interface RegisterUserParams extends LoginUserParams {
  name: string;
}

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

export const getUserNxtes = async (): Promise<ListValue[]> => {
  const { getUserNxtes: userNxtes } = await graphQLClient.request(
    gql`
      query {
        getUserNxtes {
          title
          color
          value
          createdAt
          id
        }
      }
    `
  );
  // parse date

  return parseDate(userNxtes as ListValue[]);
};

export const parseDate = (userNxtes: ListValue[]) => {
  return userNxtes.map((nxte: ListValue) => {
    return { ...nxte, createdAt: new Date(nxte.createdAt) };
  });
};
