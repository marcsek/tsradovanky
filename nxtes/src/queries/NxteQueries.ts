import { gql } from "graphql-request";
import graphQLClient from "./GraphQLClient";

import { handleZodParseSchema } from "../utils/handleZodParseSchema";
import { NxteSchema } from "./schemas/Nxte";
import { z } from "zod";
import { parseDate } from "../utils/parseDate";

// the id is generated on client beacause of an optimistic update
export const createNxte = async (input: { title: string; value: string; color: string; id: string }) => {
  const { createNote: createdNxte } = await graphQLClient.request(
    gql`
      mutation createNxte($input: NxteCreateInput!) {
        createNote(input: $input) {
          id
          title
          color
          value
        }
      }
    `,
    { input }
  );

  const PartialNxteSchema = NxteSchema.omit({ createdAt: true });
  return handleZodParseSchema<z.infer<typeof PartialNxteSchema>>(PartialNxteSchema, createdNxte);
};

const DeletedNxteSchema = z.object({ count: z.number(), Nxte: NxteSchema.array() });

export const deleteNxtes = async (input: { ids: string[] }) => {
  const { deleteManyNxtes } = await graphQLClient.request(
    gql`
      mutation deleteManyNxtes($input: DeleteManyNxteInput!) {
        deleteManyNxtes(input: $input) {
          count
          Nxte {
            value
            title
            color
            id
            createdAt
          }
        }
      }
    `,
    { input }
  );

  return handleZodParseSchema<z.infer<typeof DeletedNxteSchema>>(DeletedNxteSchema, {
    ...deleteManyNxtes,
    Nxte: parseDate(deleteManyNxtes.Nxte),
  });
};

export const updateNxte = async (input: { id: string; newValues: { title?: string; value?: string; color?: string } }) => {
  const { updateNote: updatedNxte } = await graphQLClient.request(
    gql`
      mutation updateNote($input: NxteUpdateInput!) {
        updateNote(input: $input) {
          title
          color
          value
        }
      }
    `,
    { input }
  );

  const PartialNxteSchema = NxteSchema.omit({ createdAt: true, id: true });
  return handleZodParseSchema<z.infer<typeof PartialNxteSchema>>(PartialNxteSchema, updatedNxte);
};
