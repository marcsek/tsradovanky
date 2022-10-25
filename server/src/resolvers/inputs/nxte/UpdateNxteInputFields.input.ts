import * as TypeGraphQL from "type-graphql";

@TypeGraphQL.InputType("NxteUpdateInputField", {
  isAbstract: true,
})
export class NxteUpdateInputField {
  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  title?: string;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  value?: string;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  color?: string;
}
