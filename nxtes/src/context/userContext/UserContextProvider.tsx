import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUser } from "../../queries/UserQueries";
import { UserContext } from "./UserContext";

export const UserContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const queryClient = useQueryClient();

  const { data: user } = useQuery(["user"], getUser, {
    onError(err) {
      console.log(err);
      if ((err as Error).message === "not authenticated") {
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
