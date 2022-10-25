import * as TypeGraphQL from "type-graphql";

@TypeGraphQL.ObjectType("UserCount", {
  isAbstract: true,
})
export class UserCount {
  @TypeGraphQL.Field((_type) => TypeGraphQL.Int, {
    nullable: false,
  })
  Nxte!: number;
}
