import { createContext } from "react";
import { UserContextType } from "../types/userContext";

export const UserContext = createContext<UserContextType>({ user: null, setUser: () => {} });
