import * as TypeGraphQL from "type-graphql";

@TypeGraphQL.InputType()
export class LoginInput {
  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  email!: string;

  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  password!: string;
}
