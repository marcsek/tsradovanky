import * as TypeGraphQL from "type-graphql";
import { IsName, IsUUID, IsEmail, IsPassword } from "../customValidators";

@TypeGraphQL.InputType("CreateUserInput", {
  isAbstract: true,
})
export class CreateUserInput {
  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  @IsUUID()
  id?: string;

  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  @IsName()
  name!: string;

  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  @IsPassword()
  password!: string;

  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  @IsEmail()
  email!: string;
}
