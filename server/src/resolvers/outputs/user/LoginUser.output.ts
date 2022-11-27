import * as TypeGraphQL from "type-graphql";

@TypeGraphQL.ObjectType("UserLoginOutput", {
  isAbstract: true,
})
export class UserLoginOutput {
  @TypeGraphQL.Field(_type => String, {
    nullable: false,
  })
  accessToken: string;
}
