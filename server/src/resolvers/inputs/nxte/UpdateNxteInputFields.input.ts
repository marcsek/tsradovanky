import * as TypeGraphQL from "type-graphql";
import * as Validator from "../customValidators";

@TypeGraphQL.InputType("NxteUpdateInputField", {
  isAbstract: true,
})
export class NxteUpdateInputField {
  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  @Validator.IsNxteTitle()
  title?: string;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  @Validator.IsNxteValue()
  value?: string;

  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  @Validator.IsColor()
  color?: string;
}
