import { Field, ObjectType } from "type-graphql";

import { Comment } from "../../entity/Comment";

@ObjectType()
export class CreateCommentResponse {
  @Field()
  ok: Boolean;

  @Field(() => Comment)
  comment: Comment;
}
