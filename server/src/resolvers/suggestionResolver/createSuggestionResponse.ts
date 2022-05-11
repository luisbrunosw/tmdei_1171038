import { Field, ObjectType } from "type-graphql";

import { Suggestion } from "../../domain/Suggestion";

@ObjectType()
export class CreateSuggestionResponse {
  @Field()
  ok: Boolean;

  @Field(() => Suggestion)
  suggestion: Suggestion;
}
