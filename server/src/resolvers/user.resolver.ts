import { Query, Resolver, Mutation, Arg, Ctx, UseMiddleware, Info } from "type-graphql";
import { isAuth } from "../middleware/isAuth";
import { User } from "../model/user.model";
import { UserService } from "../service";
import Context from "../types/context";
import { CreateUserInput, LoginInput } from "./inputs";
import { UpdateUserInputFields } from "./inputs/user/UpdateUserInputFields.input";
import { UserWP } from "../model/userWithoutPassword";
import { GraphQLResolveInfo } from "graphql";
import { NxteSelectionOutput } from "./outputs";

@Resolver()
export default class UserResolver {
  constructor(private userService: UserService) {
    this.userService = new UserService();
  }

  @UseMiddleware(isAuth)
  @Query(() => User)
  me(@Ctx() context: Context) {
    return context.user;
  }

  @UseMiddleware(isAuth)
  @Query(() => [NxteSelectionOutput])
  async getUserNxtes(@Ctx() context: Context, @Info() info: GraphQLResolveInfo): Promise<NxteSelectionOutput[]> {
    return this.userService.getUsersNxtes(context.user?.id ?? "", info);
  }

  @UseMiddleware(isAuth)
  @Query(() => UserWP)
  async getUser(
    @Ctx() context: Context,
    @Info() info: GraphQLResolveInfo,
    @Arg("input", { nullable: true }) input?: string
  ): Promise<UserWP> {
    return this.userService.getUser(input ?? context.user!.id!, info);
  }

  @UseMiddleware(isAuth)
  @Mutation(() => UserWP)
  async updateUser(@Arg("input") input: UpdateUserInputFields, @Ctx() context: Context, @Info() info: GraphQLResolveInfo): Promise<UserWP> {
    return this.userService.updateUser({ id: context.user!.id!, newValues: input }, info);
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
