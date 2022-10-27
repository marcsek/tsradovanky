import * as TypeGraphQL from "type-graphql";
import { IsName, IsEmail } from "../customValidators";

@TypeGraphQL.InputType("UpdateUserInputFields", {
  isAbstract: true,
})
export class UpdateUserInputFields {
  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  @IsName()
  name?: string;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  @IsEmail()
  email?: string;
}
