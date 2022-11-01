export const parseError = (error: Error): { cause: string; causeProp: string } => {
  let cause: any = error?.cause;
  let causeProp: any = cause?.extensions?.exception?.validationErrors[0]?.property;

  if (cause.message === "User doesnt exist") {
    return { cause: "User doesn't exist", causeProp };
  } else if (cause.message === "Wrong credentials") {
    return { cause: "Wrong credentials", causeProp };
  }

  return { cause: "Couldn't handle this request", causeProp };
};
