import { createContext } from "react";
import { TUser } from "../../types/user.type";

export const UserContext = createContext<{ user: TUser | null }>({ user: null });
