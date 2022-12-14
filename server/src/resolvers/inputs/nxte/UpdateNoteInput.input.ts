import * as TypeGraphQL from "type-graphql";
import { NxteUpdateInputField } from "./UpdateNxteInputFields.input";
import * as Validator from "../customValidators";

@TypeGraphQL.InputType("NxteUpdateInput", {
  isAbstract: true,
})
export class NxteUpdateInput {
  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  @Validator.IsUUID()
  id!: string;

  @TypeGraphQL.Field((_type) => NxteUpdateInputField, {
    nullable: false,
  })
  newValues!: NxteUpdateInputField;
}
