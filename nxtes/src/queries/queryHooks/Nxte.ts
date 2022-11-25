import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { TNxte } from "../../pages/NxtePage/types";
import { createNxte, deleteNxtes, updateNxte } from "../NxteQueries";
import { getUserNxtes } from "../UserQueries";

export const useCreateNxte = () => {
  const queryClient = useQueryClient();

  return useMutation(createNxte, {
    onMutate: async newNxte => {
      await queryClient.cancelQueries(["nxtes"]);

      const prevNxtes = queryClient.getQueryData<TNxte[]>(["nxtes"]);

      if (prevNxtes) {
        queryClient.setQueryData<TNxte[]>(["nxtes"], [...prevNxtes, { ...newNxte, createdAt: new Date() }]);
      }

      return prevNxtes;
    },

    onError: async (err, vars, context) => {
      if (context) {
        queryClient.setQueryData<TNxte[]>(["nxtes"], context);
      }

      toast.error("Couldn't create this Nxte");

      if ((err as Error).message === "Parsing Schema Failed") {
        try {
          await deleteNxtes({ ids: [vars.id] });
        } catch (_err) {
          throw new Error("Nxte created after error wasn't deleted");
        }
      }
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

      const prevNxtes = queryClient.getQueryData<TNxte[]>(["nxtes"]);

      if (prevNxtes) {
        const changedId = prevNxtes.findIndex(e => e.id === updatedNxte.id);
        const prevNxtesCopy = [...prevNxtes];

        prevNxtesCopy[changedId] = { ...prevNxtesCopy[changedId], ...updatedNxte.newValues };
        queryClient.setQueryData<TNxte[]>(["nxtes"], prevNxtesCopy);
      }

      return prevNxtes;
    },

    onError: async (err, vars, context) => {
      if (context) {
        queryClient.setQueryData<TNxte[]>(["nxtes"], context);
      }

      toast.error("Couldn't update this Nxte");
      if ((err as Error).message === "Parsing Schema Failed") {
        try {
          if (!context) return;
          const changedId = context?.findIndex(e => e.id === vars.id);

          if (!changedId) return;
          await updateNxte({
            id: vars.id,
            newValues: { value: context[changedId].value, title: context[changedId].title, color: context[changedId].color },
          });
        } catch (_err) {
          throw new Error("Nxte created after error wasn't deleted");
        }
      }
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

      const prevNxtes = queryClient.getQueryData<TNxte[]>(["nxtes"]);
      console.log(leftNxte);
      if (prevNxtes) {
        queryClient.setQueryData<TNxte[]>(["nxtes"], leftNxte.Nxte);
      }

      toast.success(`${leftNxte.count} reminders were deleted!`);
      queryClient.invalidateQueries(["nxtes"]);
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
