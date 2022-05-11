import { Field, ObjectType } from "type-graphql";

import { Comment } from "../../domain/Comment";

@ObjectType()
export class CreateCommentResponse {
  @Field()
  ok: Boolean;

  @Field(() => Comment)
  comment: Comment;
}
