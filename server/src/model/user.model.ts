import * as TypeGraphQL from "type-graphql";
import { UserWP } from "./userWithoutPassword";

@TypeGraphQL.ObjectType("User", {
  isAbstract: true,
})
export class User extends UserWP {
  @TypeGraphQL.Field((_type) => String, {
    nullable: false,
  })
  password!: string;
}
