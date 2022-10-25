import { PrismaClient } from "@prisma/client";
import { ApolloError } from "apollo-server-express";
import { DeleteManyNxteInput, NxteCreateInput, NxteUpdateInput } from "../resolvers/inputs";

const prisma = new PrismaClient();

export default class NxteService {
  async createNxte(input: NxteCreateInput) {
    let createdNxte;

    try {
      createdNxte = await prisma.nxte.create({ data: input });
    } catch (error) {
      console.log(error);
      throw new ApolloError("There was an error while creating Nxte");
    }

    return createdNxte;
  }

  async updateNxte(input: NxteUpdateInput, userID: string) {
    let updatedNxte;
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
          Nxte: true,
        },
      });
    } catch (error) {
      throw new ApolloError("Couldnt update this Nxte");
    }
    return updatedNxte.Nxte.at(-1);
  }

  async deleteOneNxte(postID: string, userID: string) {
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

  async deleteManyNxtes({ ids: postIDs }: DeleteManyNxteInput, userID: string) {
    let deletion;

    const prismaCompatIDs: Object[] = postIDs.map((id) => {
      return { id };
    });
    ///problem nevyhadzuje error
    try {
      deletion = await prisma.user.update({
        where: {
          id: userID,
        },
        data: {
          Nxte: {
            deleteMany: prismaCompatIDs,
          },
        },
        select: {
          Nxte: true,
        },
      });
    } catch (error) {
      throw new ApolloError("Couldnt delete these Nxtes");
    }
    return deletion.Nxte;
  }
}
