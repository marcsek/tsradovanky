import { Query, Resolver, Mutation, Arg, Ctx, UseMiddleware } from "type-graphql";
import { Nxte } from "../../prisma/generated";
import { isAuth } from "../middleware/isAuth";
import { User } from "../model/user.model";
import { UserService } from "../service";
import Context from "../types/context";
import { CreateUserInput, LoginInput } from "./inputs";

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
  async getUserPosts(@Ctx() context: Context) {
    return this.userService.getUsersPosts(context.user?.id ?? "");
  }

  @Mutation(() => User)
  createUser(@Arg("input") input: CreateUserInput) {
    return this.userService.createUser(input);
  }

  @Mutation(() => String)
  loginUser(@Arg("input") input: LoginInput, @Ctx() context: Context) {
    return this.userService.logIn(input, context);
  }
}
