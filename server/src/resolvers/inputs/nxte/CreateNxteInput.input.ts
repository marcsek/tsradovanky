import * as TypeGraphQL from "type-graphql";
import * as Validator from "../customValidators";

@TypeGraphQL.InputType("NxteCreateInput", {
  isAbstract: true,
})
export class NxteCreateInput {
  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  @Validator.IsUUID()
  id?: string;

  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  @Validator.IsUUID()
  creatorId!: string;

  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  @Validator.IsNxteTitle()
  title!: string;

  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  @Validator.IsNxteValue()
  value!: string;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: true,
  })
  @Validator.IsDate()
  createdAt?: Date;

  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  @Validator.IsColor()
  color!: string;
}
