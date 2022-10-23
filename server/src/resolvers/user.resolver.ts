import { Query, Resolver, Mutation, Arg, Ctx, UseMiddleware } from "type-graphql";
import { isAuth } from "../middleware/isAuth";
import { User, CreateUserInput, LogInInput } from "../model/user.model";
import { UserService } from "../service";
import Context from "../types/context";

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

  @Query(() => User)
  async getUser(): Promise<User> {
    return { name: "kokotek", id: 1, password: "co" };
  }

  @Mutation(() => User)
  createUser(@Arg("input") input: CreateUserInput) {
    return this.userService.createUser(input);
  }

  @Mutation(() => String)
  loginUser(@Arg("input") input: LogInInput, @Ctx() context: Context) {
    return this.userService.logIn(input, context);
  }
}
