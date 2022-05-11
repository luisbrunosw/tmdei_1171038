import { Arg, FieldResolver, Mutation, Query, Resolver, Root } from "type-graphql";

import { Post } from "../../domain/Post";
import { Comment } from "../../domain/Comment";
import { User } from "../../domain/User";
import { CreatePostInput } from "./createPostInput";
import { CreatePostResponse } from "./createPostResponse";
import ListFilter from "../../utils/Utils";

@Resolver(() => Post)
export class PostResolver {
  @Query(() => [Post])
 async posts(@Arg("filter") {first}: ListFilter): Promise<Post[]> {
    return await Post.find({ take: parseInt(first.toString()), order: { createdAt: "DESC" } })
  }

  @FieldResolver(() => [Comment])
  async comments(@Root() post: Post, @Arg("filter") {first}: ListFilter): Promise<Comment[]> {
    return await Comment.find({ take: parseInt(first.toString()), where: {post: post.id}, order: { createdAt: "DESC" } })
  }

  @FieldResolver(() => User)
  async author(@Root() post: Post): Promise<User> {
    return await User.findOneOrFail(post.author)
  }

  @Query(() => Post)
  async post(@Arg("postId") id: string): Promise<Post | undefined> {
    const post = await Post.findOne(id);
    return post;
  }

  @Mutation(() => CreatePostResponse)
  async createPost(
    @Arg("input") { author, body, title }: CreatePostInput
  ): Promise<CreatePostResponse> {
    const user = await User.findOneOrFail(author);

    const post = await Post.create({
      author: user.id,
      title,
      body,
    }).save();

    return {
      ok: true,
      post,
    };
  }

  @Mutation(() => Boolean)
  async deletePost(@Arg("postId") id: string): Promise<Boolean> {
    try {
      await Post.delete({ id });
    } catch (err) {
      console.log(err);
      return false;
    }
    return true;
  }
}
