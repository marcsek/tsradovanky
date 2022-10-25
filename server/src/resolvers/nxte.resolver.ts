import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { isAuth } from "../middleware";
import { Nxte } from "../../prisma/generated";
import { NxteService } from "../service";
import { NxteCreateInput, NxteUpdateInput, DeleteManyNxteInput } from "./inputs";
import Context from "../types/context";

@Resolver()
export default class NxteResolver {
  constructor(private nxteService: NxteService) {
    this.nxteService = new NxteService();
  }

  @UseMiddleware(isAuth)
  @Mutation(() => Nxte)
  createNote(@Arg("input") input: NxteCreateInput) {
    return this.nxteService.createNxte(input);
  }

  @UseMiddleware(isAuth)
  @Mutation(() => Nxte)
  updateNote(@Arg("input") input: NxteUpdateInput, @Ctx() context: Context) {
    return this.nxteService.updateNxte(input, context.user?.id ?? "");
  }

  @UseMiddleware(isAuth)
  @Mutation(() => [Nxte])
  deleteOneNxte(@Arg("input") id: string, @Ctx() context: Context) {
    return this.nxteService.deleteOneNxte(id, context.user?.id ?? "");
  }

  @UseMiddleware(isAuth)
  @Mutation(() => [Nxte])
  deleteManyNxtes(@Arg("input") id: DeleteManyNxteInput, @Ctx() context: Context) {
    return this.nxteService.deleteManyNxtes(id, context.user?.id ?? "");
  }
}
