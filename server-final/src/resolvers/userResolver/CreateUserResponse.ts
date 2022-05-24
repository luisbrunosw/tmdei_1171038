import { Field, ObjectType } from "type-graphql";

import { User } from "../../domain/User";

@ObjectType()
export class CreateUserResponse {
  @Field()
  ok: Boolean;

  @Field(() => User)
  user: User;
}
