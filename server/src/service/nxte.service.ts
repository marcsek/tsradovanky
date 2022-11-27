import { Nxte, PrismaClient } from "@prisma/client";
import { GraphQLError } from "graphql";
import graphqlFields from "graphql-fields";
import { DeleteManyNxteInput, NxteCreateInput, NxteUpdateInput } from "../resolvers/inputs";
import { NxteDeleteManyOutput, NxteSelectionOutput } from "../resolvers/outputs";
import { transformFields } from "../utils/transformfields";

const prisma = new PrismaClient();

export default class NxteService {
  async createNxte(input: NxteCreateInput, id: string, info: any): Promise<NxteSelectionOutput> {
    let Nxte;
    const selection = transformFields(graphqlFields(info));

    try {
      Nxte = await prisma.nxte.create({ data: { ...input, creatorId: id }, select: { ...selection } });
    } catch (error) {
      console.log(error);
      throw new GraphQLError("There was an error while creating Nxte");
    }

    return Nxte;
  }

  async updateNxte(input: NxteUpdateInput, userID: string, info: any): Promise<NxteSelectionOutput> {
    let updatedNxte;
    const selection = transformFields(graphqlFields(info));

    try {
      updatedNxte = await prisma.user.update({
        where: {
          id: userID,
        },
        data: {
          Nxte: {
            update: {
              where: {
                id: input.id,
              },
              data: input.newValues,
            },
          },
        },
        select: {
          Nxte: {
            where: {
              id: input.id,
            },
            select: {
              ...selection,
            },
          },
        },
      });
    } catch (error) {
      throw new GraphQLError("Couldnt update this Nxte");
    }
    updatedNxte = updatedNxte.Nxte.at(-1);

    if (!updatedNxte) {
      throw new GraphQLError("Error getting Nxte");
    }

    return updatedNxte;
  }

  async deleteOneNxte(postID: string, userID: string, info: any): Promise<NxteSelectionOutput[]> {
    let deletion;
    const selection = transformFields(graphqlFields(info));

    try {
      deletion = await prisma.user.update({
        where: {
          id: userID,
        },
        data: {
          Nxte: {
            delete: {
              id: postID,
            },
          },
        },
        select: {
          Nxte: { select: { ...selection } },
        },
      });
    } catch (error) {
      throw new GraphQLError("Couldnt delete this Nxte");
    }
    return deletion.Nxte;
  }

  async deleteManyNxtes({ ids: postIDs }: DeleteManyNxteInput, userID: string, info: any): Promise<NxteDeleteManyOutput> {
    let deletionResult;
    let leftPostsResult;

    const selection = transformFields(graphqlFields(info));

    const deletionAction = prisma.nxte.deleteMany({
      where: {
        AND: [
          {
            creator: {
              id: userID,
            },
          },
          {
            id: {
              in: postIDs,
            },
          },
        ],
      },
    });

    const leftPostsAction = prisma.user.findUnique({
      where: {
        id: userID,
      },
      select: {
        Nxte: { select: { ...selection.Nxte } },
      },
    });

    try {
      if (selection.Nxte) {
        const results = await prisma.$transaction([deletionAction, leftPostsAction]);
        deletionResult = results[0];
        leftPostsResult = results[1];
      } else {
        deletionResult = await deletionAction;
      }

      if (deletionResult.count !== postIDs.length) {
        throw new Error();
      }

      return { count: deletionResult.count, Nxte: leftPostsResult?.Nxte ?? [], ids: postIDs };
    } catch (error) {
      throw new GraphQLError("Couldnt delete these Nxtes");
    }
  }
}
