import { gql } from "graphql-request";
import graphQLClient from "./GraphQLClient";
import { parseDate } from "./UserQueries";

export interface NxteOutput {
  title: string;
  value: string;
  id: string;
  createdAt: Date;
  color: string;
}

// the id is generated on client beacause of an optimistic update
export const createNxte = async (input: { title: string; value: string; color: string; id: string }): Promise<NxteOutput> => {
  const { createNote } = await graphQLClient.request(
    gql`
      mutation createNxte($input: NxteCreateInput!) {
        createNote(input: $input) {
          title
          color
          value
        }
      }
    `,
    { input }
  );

  return createNote;
};

interface DeleteNxteOutput {
  Nxte: NxteOutput[];
  count: number;
  deletedIds: string[];
}

export const deleteNxtes = async (input: { ids: string[] }): Promise<DeleteNxteOutput> => {
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

  return { ...deleteManyNxtes, Nxte: parseDate(deleteManyNxtes.Nxte) };
};

export const updateNxte = async (input: {
  id: string;
  newValues: { title?: string; value?: string; color?: string };
}): Promise<NxteOutput> => {
  const { updateNote } = await graphQLClient.request(
    gql`
      mutation updateNote($input: NxteUpdateInput!) {
        updateNote(input: $input) {
          value
          title
          color
        }
      }
    `,
    { input }
  );

  return updateNote;
};
