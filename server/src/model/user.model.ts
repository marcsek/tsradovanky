import * as TypeGraphQL from "type-graphql";
import { Nxte } from "./nxte.model";
import { UserCount } from "../resolvers/outputs";

@TypeGraphQL.ObjectType("User", {
  isAbstract: true,
})
export class User {
  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  id!: string;

  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  name!: string;

  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  password!: string;

  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  email!: string;

  Nxte?: Nxte[];

  @TypeGraphQL.Field((_type) => UserCount, {
    nullable: true,
  })
  _count?: UserCount | null;
}
