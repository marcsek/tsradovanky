import { UserContext } from "./UserContext";
import { useGetUser } from "../../queries/queryHooks/User";

export const UserContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: user } = useGetUser();

  return <UserContext.Provider value={{ user: user ?? null }}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
