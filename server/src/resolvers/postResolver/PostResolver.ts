import { Arg, FieldResolver, Mutation, Query, Resolver, Root } from "type-graphql";

import { Post } from "../../entity/Post";
import { Comment } from "../../entity/Comment";
import { User } from "../../entity/User";
import { CreatePostInput } from "./createPostInput";
import { CreatePostResponse } from "./createPostResponse";

@Resolver(() => Post)
export class PostResolver {
  @Query(() => [Post])
 async posts(): Promise<Post[]> {
    return await Post.find({ order: { createdAt: "DESC" } })
  }

  @FieldResolver(() => [Comment])
  async comments(@Root() post: Post): Promise<Comment[]> {
    return await Comment.find({ where: {post: post.id}, order: { createdAt: "DESC" } })
  }

  @FieldResolver(() => User)
  async author(@Root() post: Post): Promise<User> {
    return await User.findOneOrFail({ where: {id: post.author}, order: { createdAt: "DESC" } })
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
    const user = await User.findOneOrFail({where: {id: author}});

    const post = await Post.create({
      author: user,
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
