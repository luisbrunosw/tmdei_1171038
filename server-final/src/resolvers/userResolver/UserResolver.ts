import { Arg, FieldResolver, Mutation, Query, Resolver, Root } from "type-graphql";

import { Post } from "../../domain/Post";
import { Comment } from "../../domain/Comment";
import { User } from "../../domain/User";
import { View } from "../../domain/View";
import { Suggestion } from "../../domain/Suggestion";
import { Announcement } from "../../domain/Announcement";
import { CreateUserInput } from "./createUserInput";
import { CreateUserResponse } from "./CreateUserResponse";
import ListFilter from "../../utils/Utils";

@Resolver(() => User)
export class UserResolver {
  @Query(() => [User])
 async users(@Arg("filter") {first}: ListFilter): Promise<User[]> {
    return await User.find({take: parseInt(first.toString())})
  }

  @FieldResolver(() => [Comment])
  async comments(@Root() user: User, @Arg("filter") {first}: ListFilter): Promise<Comment[]> {
    return await Comment.find({ take: parseInt(first.toString()), where: {author: user.id}, order: { createdAt: "DESC" } })
  }

  @FieldResolver(() => [Post])
  async posts(@Root() user: User, @Arg("filter") {first}: ListFilter): Promise<Post[]> {
    return await Post.find({ take: parseInt(first.toString()), where: {author: user.id}, order: { createdAt: "DESC" } })
  }

  @FieldResolver(() => [View])
  async views(@Root() user: User, @Arg("filter") {first}: ListFilter): Promise<View[]> {
    return await View.find({ take: parseInt(first.toString()), where: {author: user.id}, order: { createdAt: "DESC" } })
  }

  @FieldResolver(() => [Announcement])
  async announcements(@Root() user: User, @Arg("filter") {first}: ListFilter): Promise<Announcement[]> {
    return await Announcement.find({ take: parseInt(first.toString()), where: {author: user.id}, order: { createdAt: "DESC" } })
  }

  @FieldResolver(() => [Suggestion])
  async suggestions(@Root() user: User, @Arg("filter") {first}: ListFilter): Promise<Suggestion[]> {
    return await Suggestion.find({ take: parseInt(first.toString()), where: {author: user.id}, order: { createdAt: "DESC" } })
  }

  @Query(() => User)
  async user(@Arg("userId") id: string): Promise<User | undefined> {
    return await User.findOne(id);
  }

  @Mutation(() => CreateUserResponse)
  async createUser(
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
  async deleteUser(@Arg("userId") id: string): Promise<Boolean> {
    try {
      await User.delete({ id });
    } catch (err) {
      console.log(err);
      return false;
    }
    return true;
  }
}
