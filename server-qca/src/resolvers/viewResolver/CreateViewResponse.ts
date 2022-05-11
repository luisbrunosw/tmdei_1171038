import { Field, ObjectType } from "type-graphql";

import { View } from "../../domain/View";

@ObjectType()
export class CreateViewResponse {
  @Field()
  ok: Boolean;

  @Field(() => View)
  view: View;
}
