import { Nxte, PrismaClient } from "@prisma/client";
import { ApolloError } from "apollo-server-express";
import { DeleteManyNxteInput, NxteCreateInput, NxteUpdateInput } from "../resolvers/inputs";
import { NxteDeleteManyOutput } from "../resolvers/outputs";

const prisma = new PrismaClient();

export default class NxteService {
  async createNxte(input: NxteCreateInput): Promise<Nxte> {
    let Nxte;

    try {
      Nxte = await prisma.nxte.create({ data: input });
    } catch (error) {
      console.log(error);
      throw new ApolloError("There was an error while creating Nxte");
    }

    return Nxte;
  }

  async updateNxte(input: NxteUpdateInput, userID: string): Promise<Nxte> {
    let allNxtes;
    try {
      allNxtes = await prisma.user.update({
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
          Nxte: true,
        },
      });
    } catch (error) {
      throw new ApolloError("Couldnt update this Nxte");
    }

    const updatedElement = allNxtes.Nxte.at(-1);

    if (!updatedElement) {
      throw new ApolloError("Error getting Nxte");
    }

    return updatedElement;
  }

  async deleteOneNxte(postID: string, userID: string): Promise<Nxte[]> {
    let deletion;
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
          Nxte: true,
        },
      });
    } catch (error) {
      throw new ApolloError("Couldnt delete this Nxte");
    }
    return deletion.Nxte;
  }

  async deleteManyNxtes({ ids: postIDs }: DeleteManyNxteInput, userID: string): Promise<NxteDeleteManyOutput> {
    let deletionResult;
    let leftPostsResult;

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
        Nxte: true,
      },
    });

    try {
      const results = await prisma.$transaction([deletionAction, leftPostsAction]);
      deletionResult = results[0];
      leftPostsResult = results[1];
    } catch (error) {
      throw new ApolloError("Couldnt delete these Nxtes");
    }

    return { count: deletionResult.count, Nxte: leftPostsResult?.Nxte ?? [] };
  }
}
