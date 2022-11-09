import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createNxte, deleteNxtes, NxteOutput, updateNxte } from "../NxteQueries";
import { getUserNxtes } from "../UserQueries";

export const useCreateNxte = () => {
  const queryClient = useQueryClient();

  return useMutation(createNxte, {
    onMutate: async newNxte => {
      await queryClient.cancelQueries(["nxtes"]);

      const prevNxtes = queryClient.getQueryData<NxteOutput[]>(["nxtes"]);

      if (prevNxtes) {
        queryClient.setQueryData<NxteOutput[]>(["nxtes"], [...prevNxtes, { ...newNxte, createdAt: new Date() }]);
      }

      return prevNxtes;
    },

    onError: (_err, _vars, context) => {
      if (context) {
        queryClient.setQueryData<NxteOutput[]>(["nxtes"], context);
      }

      toast.error("Couldn't create this Nxte");
    },

    onSettled: () => {
      queryClient.invalidateQueries(["nxtes"]);
    },

    onSuccess(data) {
      console.log(data);
    },
  });
};

export const useUpdateNxte = (handleClose: () => void) => {
  const queryClient = useQueryClient();

  return useMutation(updateNxte, {
    onMutate: async updatedNxte => {
      await queryClient.cancelQueries(["nxtes"]);

      const prevNxtes = queryClient.getQueryData<NxteOutput[]>(["nxtes"]);

      if (prevNxtes) {
        const changedId = prevNxtes.findIndex(e => e.id === updatedNxte.id);
        const prevNxtesCopy = [...prevNxtes];

        prevNxtesCopy[changedId] = { ...prevNxtesCopy[changedId], ...updatedNxte.newValues };
        queryClient.setQueryData<NxteOutput[]>(["nxtes"], prevNxtesCopy);
      }

      return prevNxtes;
    },

    onError: (_err, _vars, context) => {
      if (context) {
        queryClient.setQueryData<NxteOutput[]>(["nxtes"], context);
      }

      toast.error("Couldn't update this Nxte");
    },

    onSettled: () => {
      queryClient.invalidateQueries(["nxtes"]);
    },

    onSuccess(data) {
      console.log(data);
    },
  });
};

export const useDeleteNxtes = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteNxtes, {
    onSuccess: async leftNxte => {
      await queryClient.cancelQueries(["nxtes"]);

      const prevNxtes = queryClient.getQueryData<NxteOutput[]>(["nxtes"]);

      if (prevNxtes) {
        queryClient.setQueryData<NxteOutput[]>(["nxtes"], leftNxte.Nxte);
      }

      toast.success(`${leftNxte.count} reminders were deleted!`);
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
