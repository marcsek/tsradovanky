import * as TypeGraphQL from "type-graphql";

@TypeGraphQL.InputType("UpdateUserInputFields", {
  isAbstract: true,
})
export class UpdateUserInputFields {
  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  name?: string;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  email?: string;
}
