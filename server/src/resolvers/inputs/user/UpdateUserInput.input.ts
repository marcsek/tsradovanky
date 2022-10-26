import * as TypeGraphQL from "type-graphql";
import { UpdateUserInputFields } from "./UpdateUserInputFields.input";

@TypeGraphQL.InputType("UpdateUserInput", {
  isAbstract: true,
})
export class UpdateUserInput {
  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  id!: string;

  @TypeGraphQL.Field((_type) => UpdateUserInputFields, {
    nullable: false,
  })
  newValues!: UpdateUserInputFields;
}
