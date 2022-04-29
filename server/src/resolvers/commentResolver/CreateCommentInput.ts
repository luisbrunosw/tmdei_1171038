import { Field, InputType } from "type-graphql";

@InputType()
export class CreateCommentInput {
  @Field()
  author: string;

  @Field({nullable: true})
  post: string;

  @Field()
  title: string;

  @Field()
  body: string;

  @Field({nullable: true})
  thread: string;
}
