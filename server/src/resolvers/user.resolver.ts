import { Query, Resolver, Mutation, Arg, Ctx, UseMiddleware, Info } from "type-graphql";
import { isAuth } from "../middleware/isAuth";
import { User } from "../model/user.model";
import { UserService } from "../service";
import Context, { FileUploadContext } from "../types/context";
import { CreateUserInput, LoginInput } from "./inputs";
import { UpdateUserInputFields } from "./inputs/user/UpdateUserInputFields.input";
import { UserWP } from "../model/userWithoutPassword";
import { GraphQLError, GraphQLResolveInfo } from "graphql";
import { NxteSelectionOutput } from "./outputs";
import fs from "fs";
import { ErrorCodes } from "../utils/customErrors";
import { fileUpload } from "../middleware/fileUpload";

@Resolver()
export default class UserResolver {
  constructor(private userService: UserService) {
    this.userService = new UserService();
  }

  @UseMiddleware(isAuth)
  @Query(() => String)
  me(@Ctx() context: Context) {
    return context.userID;
  }

  @UseMiddleware(isAuth)
  @Query(() => [NxteSelectionOutput])
  async getUserNxtes(@Ctx() context: Context, @Info() info: GraphQLResolveInfo): Promise<NxteSelectionOutput[]> {
    return this.userService.getUsersNxtes(context.userID!, info);
  }

  @UseMiddleware(isAuth)
  @Query(() => UserWP)
  async getUser(
    @Ctx() context: Context,
    @Info() info: GraphQLResolveInfo,
    @Arg("input", { nullable: true }) input?: string
  ): Promise<UserWP> {
    return this.userService.getUser(input ?? context.userID!, info);
  }

  @UseMiddleware(isAuth)
  @UseMiddleware(fileUpload)
  @Mutation(() => UserWP)
  async updateUser(
    @Arg("input") input: UpdateUserInputFields,
    @Ctx() context: FileUploadContext,
    @Info() info: GraphQLResolveInfo
  ): Promise<UserWP> {
    if (context.savedFile) {
      input.profileImg = context.savedFile;
    } else {
      input.profileImg = null;
    }
    return this.userService.updateUser({ id: context.userID!, newValues: input }, info);
  }

  @Mutation(() => UserWP)
  createUser(@Arg("input") input: CreateUserInput, @Info() info: GraphQLResolveInfo): Promise<UserWP> {
    return this.userService.createUser(input, info);
  }

  @Mutation(() => Boolean)
  loginUser(@Arg("input") input: LoginInput, @Ctx() context: Context): Promise<boolean> {
    return this.userService.logIn(input, context);
  }

  @Mutation(() => Boolean)
  logoutUser(@Ctx() context: Context): Promise<boolean> {
    return this.userService.logOut(context);
  }
}
