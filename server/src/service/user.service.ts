import { PrismaClient } from "@prisma/client";
import { ApolloError } from "apollo-server-express";
import bcrypt from "bcrypt";
import graphqlFields from "graphql-fields";
import { prismaHashPassword } from "../middleware";
import { User } from "../model/user.model";
import { UserWP } from "../model/userWithoutPassword";
import { CreateUserInput, LoginInput, UpdateUserInput } from "../resolvers/inputs";
import Context from "../types/context";
import { signJwt } from "../utils/jwt";
import { transformFields } from "../utils/transformfields";
import { NxteSelectionOutput } from "../resolvers/outputs";

const prisma = new PrismaClient();

prisma.$use(prismaHashPassword);

export default class UserService {
  async findByEmail(email: string): Promise<User> {
    let user;

    try {
      user = await prisma.user.findUnique({ where: { email } });
    } catch (error) {
      console.log(error);
    }
    if (!user) {
      throw new ApolloError("User doesnt exist");
    }

    return user;
  }

  async findById(id: string): Promise<User> {
    let user;

    try {
      user = await prisma.user.findUnique({ where: { id } });
    } catch (error) {
      console.log(error);
    }
    if (!user) {
      throw new ApolloError("User doesnt exist");
    }

    return user;
  }

  async createUser(input: CreateUserInput, info: any): Promise<UserWP> {
    let createdUser;
    const selection = transformFields(graphqlFields(info));

    try {
      createdUser = await prisma.user.create({ data: input, select: { ...selection } });
    } catch (error) {
      throw new ApolloError("User alredy exists");
    }
    if (!createdUser) {
      throw new ApolloError("User could not be created");
    }

    return createdUser;
  }

  async logIn(input: LoginInput, context: Context): Promise<boolean> {
    const user = await this.findByEmail(input.email);

    const passwordIsValid = await bcrypt.compare(input.password, user.password);

    if (!passwordIsValid) {
      throw new ApolloError("Wrong credentials");
    }

    const token: string = signJwt(user, { expiresIn: "1h" });
    context.res.cookie("accessToken", token, {
      maxAge: 3_600_000, // 1h
      httpOnly: true,
      // domain: "localhost",
      // path: "/",
      // sameSite: "strict",
      secure: false, // !!!
    });

    context.res.cookie("is_loggedin", "yes", {
      maxAge: 3_600_000,
      httpOnly: false,
      secure: false,
    });

    return Boolean(token);
  }

  async logOut(context: Context): Promise<boolean> {
    if (!context.req.cookies.accessToken) {
      return false;
    }

    context.res.clearCookie("accessToken");
    context.res.clearCookie("is_loggedin");
    return true;
  }

  async getUser(input: string, info: any): Promise<UserWP> {
    let user;
    const selection = transformFields(graphqlFields(info));

    try {
      user = await prisma.user.findUnique({
        where: {
          id: input,
        },
        select: { ...selection },
      });
    } catch (error) {
      throw new ApolloError(`Could not get user (provided id: ${input})`);
    }

    if (!user) {
      throw new ApolloError("User doesnt exist");
    }
    return user;
  }

  async getUsersNxtes(input: string, info: any): Promise<NxteSelectionOutput[]> {
    let user;
    const selection = transformFields(graphqlFields(info));

    try {
      user = await prisma.user.findUnique({
        where: {
          id: input,
        },
        select: {
          Nxte: {
            select: {
              ...selection,
            },
          },
        },
      });
    } catch (error) {
      throw new ApolloError(`Could not get users posts (provided id: ${input})`);
    }
    if (!user) {
      throw new ApolloError("User doesnt exist");
    }
    return user.Nxte;
  }

  async updateUser(input: UpdateUserInput, info: any): Promise<UserWP> {
    let updatedUser: UserWP;
    const selection = transformFields(graphqlFields(info));

    try {
      updatedUser = await prisma.user.update({
        where: {
          id: input.id,
        },
        data: input.newValues,
        select: {
          ...selection,
        },
      });
    } catch (error) {
      throw new ApolloError("Couldnt update this User");
    }

    if (!updatedUser) {
      throw new ApolloError("Error getting User");
    }
    return updatedUser;
  }
}
