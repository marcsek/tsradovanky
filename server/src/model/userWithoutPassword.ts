import * as TypeGraphQL from "type-graphql";
import { Nxte } from "./nxte.model";
import { UserCount } from "../resolvers/outputs";

@TypeGraphQL.ObjectType("UserWP", {
  isAbstract: true,
})
export class UserWP {
  @TypeGraphQL.Field(_type => String, {
    nullable: true,
  })
  id?: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: true,
  })
  name?: string;

  @TypeGraphQL.Field(_type => String, {
    nullable: true,
  })
  email?: string;

  Nxte?: Nxte[];

  @TypeGraphQL.Field(_type => UserCount, {
    nullable: true,
  })
  _count?: UserCount | null;
}
