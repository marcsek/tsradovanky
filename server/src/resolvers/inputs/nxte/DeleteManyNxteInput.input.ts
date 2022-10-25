import * as TypeGraphQL from "type-graphql";

@TypeGraphQL.InputType("DeleteManyNxteInput", {
  isAbstract: true,
})
export class DeleteManyNxteInput {
  @TypeGraphQL.Field((_type) => [String], {
    nullable: false,
  })
  ids!: string[];
}
