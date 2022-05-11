import { Field, ObjectType } from "type-graphql";

import { Post } from "../../domain/Post";

@ObjectType()
export class CreatePostResponse {
  @Field()
  ok: Boolean;

  @Field(() => Post)
  post: Post;
}
