import { Field, ObjectType } from "type-graphql";

import { Trend } from "../../entity/Trend";

@ObjectType()
export class CreateTrendResponse {
  @Field()
  ok: Boolean;

  @Field(() => Trend)
  trend: Trend;
}
