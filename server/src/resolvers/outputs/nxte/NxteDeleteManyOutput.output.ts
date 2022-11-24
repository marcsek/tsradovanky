import * as TypeGraphQL from "type-graphql";
import { Nxte } from "../../../model/nxte.model";
import { NxteSelectionOutput } from "./NxteSelectionOutput.output";

@TypeGraphQL.ObjectType("NxteDeleteManyOutput", {
  isAbstract: true,
})
export class NxteDeleteManyOutput {
  @TypeGraphQL.Field(_type => [Nxte], {
    nullable: true,
  })
  Nxte?: NxteSelectionOutput[];

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: true,
  })
  count?: number;

  @TypeGraphQL.Field(_type => [String], {
    nullable: true,
  })
  ids?: string[];
}
