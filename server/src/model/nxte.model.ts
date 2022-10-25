import * as TypeGraphQL from "type-graphql";
import { User } from "./user.model";

@TypeGraphQL.ObjectType("Nxte", {
  isAbstract: true,
})
export class Nxte {
  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  id!: string;

  creator?: User;

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
    nullable: false,
  })
  createdAt!: Date;

  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  color!: string;
}
