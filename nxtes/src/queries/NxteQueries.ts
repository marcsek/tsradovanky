import { gql } from "graphql-request";
import graphQLClient from "./GraphQLClient";

interface NxteOutput {
  title: string;
  value: string;
  id: string;
  createdAt: Date;
  color: string;
}

export const createNxte = async (input: { title: string; value: string; color: string }): Promise<NxteOutput> => {
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
          }
        }
      }
    `,
    { input }
  );

  return deleteManyNxtes;
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
