import UserResolver from "./user.resolver";
import NxteResolver from "./nxte.resolver";

export const resolvers = [UserResolver, NxteResolver] as const;
