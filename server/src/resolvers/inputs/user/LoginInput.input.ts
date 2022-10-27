import * as TypeGraphQL from "type-graphql";
import * as Validator from "class-validator";

@TypeGraphQL.InputType()
export class LoginInput {
  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  @Validator.IsEmail()
  email!: string;

  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  password!: string;
}
