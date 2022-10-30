import { useQuery, useQueryClient, UseQueryResult } from "@tanstack/react-query";
import React from "react";
import { getUser } from "../queries";
import { UserType } from "../types/user.type";
import { UserContext } from "./UserContext";

export const UserContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const queryClient = useQueryClient();

  const { data: user, isLoading }: UseQueryResult<UserType, Error> = useQuery<UserType, Error>(["user"], getUser, {
    onError(err) {
      console.log(err);
      if (err.message === "not authenticated") {
        queryClient.setQueryData(["user"], null);
      }
    },

    suspense: true,
    retry: false,
    refetchInterval: 20000,
  });

  return <UserContext.Provider value={{ user: user ?? null }}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
