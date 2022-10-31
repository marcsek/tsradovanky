import { createContext } from "react";
import { UserType } from "../../types/user.type";

export const UserContext = createContext<{ user: UserType | null }>({ user: null });
