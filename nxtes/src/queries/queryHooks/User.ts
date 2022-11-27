import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getUser, loginUser, logoutUser, registerUser } from "../UserQueries";

export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation(loginUser, {
    onSuccess: async data => {
      if (data) {
        queryClient.setQueryData(["user"], null);
        await queryClient.resetQueries(["user"]);
        navigate("/board");
      }
    },
    onError: error => {
      console.log(error, (error as Error).cause);
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation<boolean, Error, unknown>(logoutUser, {
    onSuccess(data) {
      if (data) {
        queryClient.setQueryData(["user"], null);
        queryClient.setQueryData(["nxtes"], null);
      }
    },
    onError(err) {
      console.log(err);
    },
  });
};

export const useRegister = () => {
  const login = useLogin();

  return useMutation(registerUser, {
    onSuccess: (data, variables) => {
      login.mutate({ email: variables.email, password: variables.password });
    },
    onError: error => {
      console.log(error, (error as Error).cause);
    },
  });
};

export const useGetUser = () => {
  const queryClient = useQueryClient();
  // const [cookies] = useCookies(["is_loggedin"]);

  return useQuery(["user"], getUser, {
    onError(err) {
      if ((err as Error).message === "not authenticated") {
        queryClient.setQueryData(["user"], null);
      }
    },

    onSettled() {
      console.log("User fetch complete");
    },

    enabled: !!document.cookie.match(/^(.*;)?\s*is_loggedin\s*=\s*[^;]+(.*)?$/),
    suspense: true,
    retry: false,
    refetchInterval: 60000,
  });
};
