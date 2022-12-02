import { z } from "zod";
import { UserSchema } from "../queries/schemas/User";

export type TUser = z.infer<typeof UserSchema>;
