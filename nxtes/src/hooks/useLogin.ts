import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { LoginUserParams } from "../queries/types/inputTypes";
import { loginUser } from "../queries";

const useLogin = (): UseMutationResult<boolean, Error, LoginUserParams> => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation<boolean, Error, LoginUserParams>(async ({ email, password }) => loginUser({ email, password }), {
    onSuccess: async (data) => {
      if (data) {
        queryClient.setQueryData(["user"], null);
        await queryClient.resetQueries(["user"]);
        navigate("/board");
      }
    },
    onError: (error) => {
      console.log(error, error.cause);
    },
  });
};

export default useLogin;
