import { Arg, FieldResolver, Mutation, Query, Resolver, Root } from "type-graphql";

import { Comment } from "../../entity/Comment";
import { User } from "../../entity/User";
import { CreateCommentInput } from "./CreateCommentInput";
import { CreateCommentResponse } from "./CreateCommentResponse";

@Resolver(() => Comment)
export class CommentResolver {
  @Query(() => [Comment])
  async comments(): Promise<Comment[]> {
    return await Comment.find({ order: { createdAt: "DESC" } });
  }
  
  /*@FieldResolver(() => [Comment])
  async comments(@Root() post: Post): Promise<Comment[]> {
    return await Comment.find({ where: {post: post.id}, order: { createdAt: "DESC" } })
  }*/

  @FieldResolver(() => User)
  async author(@Root() comment: Comment): Promise<User> {
    return await User.findOneOrFail({ where: {id: comment.author}, order: { createdAt: "DESC" } })
  }

  @Query(() => Comment)
  async post(@Arg("commentId") id: string): Promise<Comment | undefined> {
    return await Comment.findOne(id);
  }

  @Mutation(() => CreateCommentResponse)
  async createComment(
    @Arg("input") { author, body, title }: CreateCommentInput
  ): Promise<CreateCommentResponse> {
    const user = await User.findOneOrFail({where: {id: author}});

    const comment = await Comment.create({
      author: user,
      title,
      body,
    }).save();

    return {
      ok: true,
      comment,
    };
  }

  @Mutation(() => Boolean)
  async deleteComment(@Arg("commentId") id: string): Promise<Boolean> {
    try {
      await Comment.delete({ id });
    } catch (err) {
      console.log(err);
      return false;
    }
    return true;
  }
}
