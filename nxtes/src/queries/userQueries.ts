import { gql } from "graphql-request";
import { TNxte } from "../pages/NxtePage/types";
import graphQLClient from "./GraphQLClient";
import { UserSchema } from "./schemas/User";
import { z } from "zod";
import { handleZodParseSchema } from "../utils/handleZodParseSchema";
import { NxteSchema } from "./schemas/Nxte";
import { parseDate } from "../utils/parseDate";

interface LoginUserParams {
  email: string;
  password: string;
}

const BooleanSchema = z.boolean();
type TBooleanSchema = z.infer<typeof BooleanSchema>;

export const loginUser = async (input: LoginUserParams) => {
  const { loginUser } = await graphQLClient.request(
    gql`
      mutation loginUser($input: LoginInput!) {
        loginUser(input: $input)
      }
    `,
    { input }
  );

  return handleZodParseSchema<TBooleanSchema>(BooleanSchema, loginUser);
};

export const logoutUser = async () => {
  const { logoutUser } = await graphQLClient.request(
    gql`
      mutation {
        logoutUser
      }
    `
  );

  return handleZodParseSchema<TBooleanSchema>(BooleanSchema, logoutUser);
};

export const getUser = async () => {
  const { getUser } = await graphQLClient.request(gql`
    query {
      getUser {
        name
        id
        email
      }
    }
  `);

  return handleZodParseSchema<z.infer<typeof UserSchema>>(UserSchema, getUser);
};

interface RegisterUserParams extends LoginUserParams {
  name: string;
}

export const registerUser = async (input: RegisterUserParams) => {
  const { createUser } = await graphQLClient.request(
    gql`
      mutation loginUser($input: CreateUserInput!) {
        createUser(input: $input) {
          id
        }
      }
    `,
    { input }
  );

  const RegisterOutputSchema = z.object({ id: z.string().uuid() });
  return handleZodParseSchema<z.infer<typeof RegisterOutputSchema>>(RegisterOutputSchema, createUser);
};

export const getUserNxtes = async () => {
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

  const NxteArray = NxteSchema.array();

  return handleZodParseSchema<z.infer<typeof NxteArray>>(NxteArray, parseDate(userNxtes as TNxte[]));
};
