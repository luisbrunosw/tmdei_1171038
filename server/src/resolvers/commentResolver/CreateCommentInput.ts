import { Field, InputType } from "type-graphql";

@InputType()
export class CreateCommentInput {
  @Field()
  author: string;

  @Field()
  title: string;

  @Field()
  body: string;
}
