import { Arg, Ctx, Mutation, Resolver, UseMiddleware, Info } from "type-graphql";
import { isAuth } from "../middleware";
import { NxteService } from "../service";
import { NxteCreateInput, NxteUpdateInput, DeleteManyNxteInput } from "./inputs";
import Context from "../types/context";
import { NxteDeleteManyOutput, NxteSelectionOutput } from "./outputs";
import { Nxte } from "../model/nxte.model";
import { GraphQLResolveInfo } from "graphql";

@Resolver()
export default class NxteResolver {
  constructor(private nxteService: NxteService) {
    this.nxteService = new NxteService();
  }

  @UseMiddleware(isAuth)
  @Mutation(() => NxteSelectionOutput)
  createNote(@Arg("input") input: NxteCreateInput, @Ctx() context: Context, @Info() info: GraphQLResolveInfo) {
    return this.nxteService.createNxte(input, context.user?.id!, info);
  }

  @UseMiddleware(isAuth)
  @Mutation(() => NxteSelectionOutput)
  updateNote(@Arg("input") input: NxteUpdateInput, @Ctx() context: Context, @Info() info: GraphQLResolveInfo) {
    return this.nxteService.updateNxte(input, context.user?.id!, info);
  }

  @UseMiddleware(isAuth)
  @Mutation(() => [Nxte])
  deleteOneNxte(@Arg("input") id: string, @Ctx() context: Context, @Info() info: GraphQLResolveInfo) {
    return this.nxteService.deleteOneNxte(id, context.user?.id!, info);
  }

  @UseMiddleware(isAuth)
  @Mutation(() => NxteDeleteManyOutput)
  deleteManyNxtes(@Arg("input") id: DeleteManyNxteInput, @Ctx() context: Context, @Info() info: GraphQLResolveInfo) {
    return this.nxteService.deleteManyNxtes(id, context.user?.id!, info);
  }
}
