import { Query, Resolver, Mutation, Arg, Ctx, UseMiddleware } from "type-graphql";
import { Nxte } from "../model/nxte.model";
import { isAuth } from "../middleware/isAuth";
import { User } from "../model/user.model";
import { UserService } from "../service";
import Context from "../types/context";
import { CreateUserInput, LoginInput } from "./inputs";
import { UpdateUserInputFields } from "./inputs/user/UpdateUserInputFields.input";
import { UserWP } from "../model/userWithoutPassword";

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
  @Query(() => [Nxte])
  async getUserNxtes(@Ctx() context: Context): Promise<Nxte[]> {
    return this.userService.getUsersNxtes(context.user?.id ?? "");
  }

  @UseMiddleware(isAuth)
  @Query(() => UserWP)
  async getUser(@Ctx() context: Context, @Arg("input", { nullable: true }) input?: string): Promise<UserWP> {
    return this.userService.getUser(input ?? context.user!.id);
  }

  @UseMiddleware(isAuth)
  @Mutation(() => UserWP)
  async updateUser(@Arg("input") input: UpdateUserInputFields, @Ctx() context: Context): Promise<User> {
    return this.userService.updateUser({ id: context.user?.id ?? "", newValues: input });
  }

  @Mutation(() => UserWP)
  createUser(@Arg("input") input: CreateUserInput): Promise<UserWP> {
    return this.userService.createUser(input);
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
