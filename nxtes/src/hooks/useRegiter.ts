import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { registerUser } from "../queries";
import { RegisterUserParams } from "../queries/types/inputTypes";
import useLogin from "./useLogin";

const useRegister = (): UseMutationResult<boolean, Error, RegisterUserParams> => {
  const login = useLogin();

  return useMutation<boolean, Error, RegisterUserParams>(async ({ email, password, name }) => registerUser({ email, password, name }), {
    onSuccess: (data, variables) => {
      login.mutate({ email: variables.email, password: variables.password });
    },
    onError: (error) => {
      console.log(error, error.cause);
    },
  });
};

export default useRegister;
