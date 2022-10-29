import { useQuery, UseQueryResult } from "react-query";
import { GraphQLClient, gql } from "graphql-request";
import { UserType } from "../types/user.type";

const API_URL = "http://localhost:3001/graphql";

const graphQLClient = new GraphQLClient(API_URL, {
  credentials: "include",
  mode: "cors",
});

export const useLogin = (email: string, password: string): UseQueryResult => {
  return useQuery(
    "login-user",
    async () => {
      const { loginUser } = await graphQLClient.request(gql`
        mutation {
          loginUser(input: { email: "ds@gmail.com", password: "" })
        }
      `);
      return loginUser;
    },
    { enabled: false }
  );
};

export const useGetMe = (): UseQueryResult<UserType> => {
  return useQuery<UserType>("getUser", async () => {
    const user = await graphQLClient.request(gql`
      query {
        getUser {
          name
          id
          email
        }
      }
    `);
    return user;
  });
};
