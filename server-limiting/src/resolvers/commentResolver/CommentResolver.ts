import { Arg, FieldResolver, Mutation, Query, Resolver, Root } from "type-graphql";

import { Comment } from "../../domain/Comment";
import { User } from "../../domain/User";
import { Post } from "../../domain/Post";
import { CreateCommentInput } from "./CreateCommentInput";
import { CreateCommentResponse } from "./CreateCommentResponse";
import { ListFilter } from "../../utils/Utils";

@Resolver(() => Comment)
export class CommentResolver {
  @Query(() => [Comment])
  async comments(@Arg("filter") {first}: ListFilter): Promise<Comment[]> {
    return await Comment.find({ take: first, order: { createdAt: "DESC" } });
  }
  
  @FieldResolver(() => [Comment])
  async answers(@Root() comment: Comment, @Arg("filter") {first}: ListFilter): Promise<Comment[]> {
    return await Comment.find({ take: first, where: {thread: comment.id}, order: { createdAt: "DESC" } })
  }
  
  @FieldResolver(() => Comment)
  async thread(@Root() comment: Comment): Promise<Comment> {
    return await Comment.findOneOrFail(comment.id)
  }

  @FieldResolver(() => User)
  async author(@Root() comment: Comment): Promise<User> {
    return await User.findOneOrFail(comment.author)
  }

  @FieldResolver(() => Post)
  async post(@Root() comment: Comment): Promise<Post> {
    return await Post.findOneOrFail(comment.post)
  }

  @Query(() => Comment)
  async comment(@Arg("commentId") id: string): Promise<Comment | undefined> {
    return await Comment.findOne(id);
  }

  @Mutation(() => CreateCommentResponse)
  async createComment(
    @Arg("input") { author, body, title, post, thread }: CreateCommentInput
  ): Promise<CreateCommentResponse> {
    const user = await User.findOneOrFail(author);
    const postOrThread = await this.getPostOrThread(post, thread);

    const comment = await Comment.create({
      ...postOrThread,
      author: user.id,
      title,
      body,
    }).save();

    return {
      ok: true,
      comment,
    };
  }

  async getPostOrThread(post: string, thread: string) { 
    if(thread){
       const threadObj = await Comment.findOneOrFail(thread);
       return {
           thread: threadObj.id
       }
    }

    const postObj = await Post.findOneOrFail(post);
    return {
        post: postObj.id
    }
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
