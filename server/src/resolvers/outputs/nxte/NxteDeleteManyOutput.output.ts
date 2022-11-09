import * as TypeGraphQL from "type-graphql";
import { Nxte } from "../../../model/nxte.model";

@TypeGraphQL.ObjectType("NxteDeleteManyOutput", {
  isAbstract: true,
})
export class NxteDeleteManyOutput {
  @TypeGraphQL.Field(_type => [Nxte], {
    nullable: false,
  })
  Nxte!: Nxte[];

  @TypeGraphQL.Field(_type => TypeGraphQL.Int, {
    nullable: false,
  })
  count!: number;

  @TypeGraphQL.Field(_type => [String], {
    nullable: false,
  })
  ids!: string[];
}
