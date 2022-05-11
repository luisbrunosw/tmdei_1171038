import { Field, InputType } from "type-graphql";

@InputType()
export class CreateSuggestionInput {
  @Field()
  body: string;

  @Field()
  tag: string;

  @Field()
  author: string;
}
