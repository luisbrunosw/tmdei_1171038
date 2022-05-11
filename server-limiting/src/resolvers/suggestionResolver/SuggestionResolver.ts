import { Arg, FieldResolver, Mutation, Query, Resolver, Root } from "type-graphql";

import { Suggestion } from "../../domain/Suggestion";
import { User } from "../../domain/User";
import { CreateSuggestionInput } from "./createSuggestionInput";
import { CreateSuggestionResponse } from "./createSuggestionResponse";
import { ListFilter } from "../../utils/Utils";

@Resolver(() => Suggestion)
export class Suggestionsolver {
  @Query(() => [Suggestion])
  async suggestions(@Arg("filter") {first}: ListFilter): Promise<Suggestion[]> {
    const suggestions = await Suggestion.find({ take: first, order: { createdAt: "DESC" } });
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
