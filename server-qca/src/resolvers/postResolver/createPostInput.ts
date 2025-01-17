import { Field, InputType } from "type-graphql";

@InputType()
export class CreatePostInput {
  @Field()
  author: string;

  @Field()
  title: string;

  @Field()
  body: string;
}
