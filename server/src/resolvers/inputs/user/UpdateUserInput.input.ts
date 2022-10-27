import * as TypeGraphQL from "type-graphql";
import { UpdateUserInputFields } from "./UpdateUserInputFields.input";
import { IsUUID } from "../customValidators";

@TypeGraphQL.InputType("UpdateUserInput", {
  isAbstract: true,
})
export class UpdateUserInput {
  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  @IsUUID()
  id!: string;

  @TypeGraphQL.Field((_type) => UpdateUserInputFields, {
    nullable: false,
  })
  newValues!: UpdateUserInputFields;
}
