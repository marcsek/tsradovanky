import { PrismaClient } from "@prisma/client";
import { ApolloError } from "apollo-server-express";
import { CreateUserInput, LogInInput } from "../model/user.model";
import bcrypt from "bcrypt";
import Context from "../types/context";
import { signJwt } from "../utils/jwt";

const prisma = new PrismaClient();

prisma.$use(async (params, next) => {
  if (params.model == "User" && params.action == "create") {
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hashSync(params.args.data.password, salt);

    params.args.data.password = hash;
  }

  return next(params);
});

export default class UserService {
  async findByName(name: string) {
    let user;

    try {
      user = await prisma.user.findUnique({ where: { name } });
    } catch (error) {
      console.log(error);
    }
    if (!user) {
      throw new ApolloError("User doesnt exist");
    }

    return user;
  }

  async createUser(input: CreateUserInput) {
    let createdUser;
    try {
      createdUser = await prisma.user.create({ data: input });
    } catch (error) {
      console.log(error);
    }
    if (!createdUser) {
      throw new ApolloError("User could not be created");
    }

    return createdUser;
  }

  async logIn(input: LogInInput, context: Context) {
    const user = await this.findByName(input.name);

    const passwordIsValid = await bcrypt.compare(input.password, user.password);

    if (!passwordIsValid) {
      throw new ApolloError("Wrong credentials");
    }

    const token: string = signJwt(user);
    context.res.cookie("accessToken", token, {
      maxAge: 3_600_000, // 1h
      httpOnly: true,
      domain: "localhost",
      path: "/",
      sameSite: "strict",
      secure: false, // !!!
    });

    return token;
  }
}
