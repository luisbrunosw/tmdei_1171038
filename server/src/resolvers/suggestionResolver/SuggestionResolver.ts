import { Arg, Mutation, Query, Resolver } from "type-graphql";

import { Suggestion } from "../../entity/Suggestions";
import { CreateSuggestionInput } from "./createSuggestionInput";
import { CreateSuggestionResponse } from "./createSuggestionResponse";

@Resolver()
export class Suggestionsolver {
  @Query(() => [Suggestion])
  async suggestions(): Promise<Suggestion[]> {
    const suggestions = await Suggestion.find({ order: { createdAt: "DESC" } });
    return suggestions;
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
    @Arg("input") { body, tag }: CreateSuggestionInput
  ): Promise<CreateSuggestionResponse> {
    const suggestion = await Suggestion.create({
      body,
      tag,
    }).save();

    return {
      ok: true,
      suggestion,
    };
  }
}
