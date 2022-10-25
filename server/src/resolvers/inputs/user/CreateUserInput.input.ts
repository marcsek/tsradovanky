import * as TypeGraphQL from "type-graphql";

@TypeGraphQL.InputType("CreateUserInput", {
  isAbstract: true,
})
export class CreateUserInput {
  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  id?: string;

  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  name!: string;

  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  password!: string;

  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  email!: string;
}
