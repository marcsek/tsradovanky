import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";
import { logoutUser } from "../queries/userQueries";

const useLogout = (): UseMutationResult<boolean, Error, unknown> => {
  const queryClient = useQueryClient();

  return useMutation<boolean, Error, unknown>(async () => logoutUser(), {
    onSuccess(data) {
      if (data) {
        queryClient.setQueryData(["user"], null);
      }
    },
    onError(err) {
      console.log(err);
    },
  });
};

export default useLogout;
