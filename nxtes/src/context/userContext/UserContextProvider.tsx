import { useQuery, useQueryClient, UseQueryResult } from "@tanstack/react-query";
import { getUser } from "../../queries/UserQueries";
import { UserType } from "../../types/user.type";
import { UserContext } from "./UserContext";

export const UserContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const queryClient = useQueryClient();

  const { data: user }: UseQueryResult<UserType, Error> = useQuery<UserType, Error>(["user"], getUser, {
    onError(err) {
      console.log(err);
      if (err.message === "not authenticated") {
        queryClient.setQueryData(["user"], null);
      }
    },

    onSettled() {
      console.log("settle");
    },

    enabled: !!document.cookie.match(/^(.*;)?\s*is_loggedin\s*=\s*[^;]+(.*)?$/),
    suspense: true,
    retry: false,
    refetchInterval: 60000,
  });

  return <UserContext.Provider value={{ user: user ?? null }}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
