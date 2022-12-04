import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GraphQLError } from "graphql-request/dist/types";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ErrorCodes } from "../Errors";
import { getUser, loginUser, logoutUser, registerUser, updateUser } from "../UserQueries";

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
        queryClient.removeQueries(["nxtes"]);
      }
    },
    onError(err) {
      toast.error("Couldn't log out.");
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
      if ((err as Error).cause === ErrorCodes.NOT_AUTHENTICATED) {
        queryClient.setQueryData(["user"], null);
        queryClient.removeQueries(["nxtes"]);
      }
    },

    onSettled() {
      // console.log("User fetch complete");
    },

    enabled: !!document.cookie.match(/^(.*;)?\s*is_loggedin\s*=\s*[^;]+(.*)?$/),
    suspense: true,
    retry: false,
    refetchInterval: 60000,
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation(updateUser, {
    onSuccess: data => {
      queryClient.setQueryData(["user"], data);
      toast.success("Update successful!");
    },

    onError: error => {
      let toastText = "Your file could not be uploaded.";
      const errorCause = (error as Error).cause;
      if (errorCause === ErrorCodes.FILE_EXTENSION_NOT_SUPPORTED) {
        toastText = "Your file had unsupported file extension";
      } else if (errorCause === ErrorCodes.FILE_SIZE_EXCEEDED) {
        toastText = "Your file exceeded max. file size (2.5 MB)";
      }

      toast.error(toastText);
    },
  });
};
