import * as TypeGraphQL from "type-graphql";
import { User } from "../../../model/user.model";

@TypeGraphQL.ObjectType("NxteSelectionOutput", {
  isAbstract: true,
})
export class NxteSelectionOutput {
  @TypeGraphQL.Field(_type => String, {
    nullable: true,
  })
  id?: string;

  creator?: User;

  @TypeGraphQL.Field(_type => String, {
    nullable: true,
  })
  creatorId?: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: true,
  })
  title?: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: true,
  })
  value?: string;

  @TypeGraphQL.Field(_type => Date, {
    nullable: true,
  })
  createdAt?: Date;

  @TypeGraphQL.Field(_type => String, {
    nullable: true,
  })
  color?: string;
}
