import * as TypeGraphQL from "type-graphql";

@TypeGraphQL.InputType("NxteCreateInput", {
  isAbstract: true,
})
export class NxteCreateInput {
  @TypeGraphQL.Field((_type) => String, {
    nullable: true,
  })
  id?: string;

  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  creatorId!: string;

  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  title!: string;

  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  value!: string;

  @TypeGraphQL.Field((_type) => Date, {
    nullable: true,
  })
  createdAt?: Date;

  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  color!: string;
}
