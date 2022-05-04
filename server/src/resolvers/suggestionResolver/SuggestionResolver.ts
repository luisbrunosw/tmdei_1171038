import { Arg, FieldResolver, Mutation, Query, Resolver, Root } from "type-graphql";

import { Suggestion } from "../../entity/Suggestion";
import { User } from "../../entity/User";
import { CreateSuggestionInput } from "./createSuggestionInput";
import { CreateSuggestionResponse } from "./createSuggestionResponse";

@Resolver(() => Suggestion)
export class Suggestionsolver {
  @Query(() => [Suggestion])
  async suggestions(): Promise<Suggestion[]> {
    const suggestions = await Suggestion.find({ order: { createdAt: "DESC" } });
    return suggestions;
  }

  @FieldResolver(() => User)
  async author(@Root() suggestion: Suggestion): Promise<User> {
    return await User.findOneOrFail(suggestion.author)
  }

  @Query(() => [Suggestion])
  async newSuggestions(): Promise<Suggestion[]> {
    const suggestions = await Suggestion.find({
      order: { createdAt: "DESC" },
      take: 3,
    });
    return suggestions;
  }

  @Mutation(() => CreateSuggestionResponse)
  async createSuggugestion(
    @Arg("input") { body, tag, author }: CreateSuggestionInput
  ): Promise<CreateSuggestionResponse> {
    const user = await User.findOneOrFail(author);

    const suggestion = await Suggestion.create({
      body,
      tag,
      author: user.id
    }).save();

    return {
      ok: true,
      suggestion,
    };
  }
}
