import { ErrorCodes } from "../queries/Errors";

export const parseError = (error: Error): { cause: string; causeProp: string } => {
  let cause: any = error?.cause;
  let causeProp: any = cause?.extensions?.exception?.validationErrors[0]?.property;

  if (cause === ErrorCodes.USER_NOT_FOUND) {
    return { cause: "User doesn't exist", causeProp };
  } else if (cause === ErrorCodes.WRONG_CREDENTIALS) {
    return { cause: "Wrong credentials", causeProp };
  }

  return { cause: "Couldn't handle this request", causeProp };
};
