import { Field, ObjectType } from "type-graphql";

import { Suggestion } from "../../entity/Suggestions";

@ObjectType()
export class CreateSuggestionResponse {
  @Field()
  ok: Boolean;

  @Field(() => Suggestion)
  suggestion: Suggestion;
}
