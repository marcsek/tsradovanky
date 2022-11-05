import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createNxte, deleteNxtes, updateNxte } from "../NxteQueries";
import { getUserNxtes } from "../UserQueries";

export const useCreateNxte = (handleClose: () => void) => {
  const queryClient = useQueryClient();

  return useMutation(createNxte, {
    onSuccess(data) {
      console.log(data);
      handleClose();
      queryClient.refetchQueries(["nxtes"]);
    },
  });
};

export const useDeleteNxtes = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteNxtes, {
    onSuccess(data) {
      toast.success(`${data?.count} reminders were deleted!`);
      queryClient.refetchQueries(["nxtes"]);
    },
  });
};

export const useUpdateNxte = (handleClose: () => void) => {
  const queryClient = useQueryClient();

  return useMutation(updateNxte, {
    onSuccess(data) {
      console.log(data);
      handleClose();
      queryClient.refetchQueries(["nxtes"]);
    },
  });
};

export const useNxtes = () => {
  const data = useQuery(["nxtes"], getUserNxtes, {
    onSuccess(data) {
      console.log(data);
    },
    onError(err) {
      console.log(err);
    },
    suspense: true,
  });

  return { ...data, data: data.data ?? [] };
};
