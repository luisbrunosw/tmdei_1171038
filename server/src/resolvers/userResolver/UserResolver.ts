import { Arg, FieldResolver, Mutation, Query, Resolver, Root } from "type-graphql";

import { Post } from "../../entity/Post";
import { Comment } from "../../entity/Comment";
import { User } from "../../entity/User";
import { CreateUserInput } from "./createUserInput";
import { CreateUserResponse } from "./CreateUserResponse";

@Resolver(() => User)
export class UserResolver {
  @Query(() => [User])
 async users(): Promise<User[]> {
    return await User.find()
  }

  @FieldResolver(() => [Comment])
  async comments(@Root() user: User): Promise<Comment[]> {
    return await Comment.find({ where: {author: user.id}, order: { createdAt: "DESC" } })
  }

  @FieldResolver(() => [Post])
  async posts(@Root() user: User): Promise<Post[]> {
    return await Post.find({ where: {author: user.id}, order: { createdAt: "DESC" } })
  }

  @Query(() => User)
  async post(@Arg("userId") id: string): Promise<User | undefined> {
    return await User.findOne(id);
  }

  @Mutation(() => CreateUserResponse)
  async createPost(
    @Arg("input") { name }: CreateUserInput
  ): Promise<CreateUserResponse> {
    const user = await User.create({
      name
    }).save();

    return {
      ok: true,
      user,
    };
  }

  @Mutation(() => Boolean)
  async deletePost(@Arg("userId") id: string): Promise<Boolean> {
    try {
      await User.delete({ id });
    } catch (err) {
      console.log(err);
      return false;
    }
    return true;
  }
}
