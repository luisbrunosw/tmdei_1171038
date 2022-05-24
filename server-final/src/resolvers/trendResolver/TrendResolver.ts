import ListFilter, { formatQuery } from "../../utils/Utils";
import { Arg, FieldResolver, Mutation, Query, Resolver, Root } from "type-graphql";

import { Trend } from "../../domain/Trend";
import { View } from "../../domain/View";
import { CreateTrendResponse } from "./createTrendResponse";
import { CreateTrendInput } from "./createTrendInput";
import { TrendFilter } from "./TrendFilter";
import { number } from "yup";

@Resolver(() => Trend)
export class TrendResolver {
  @Query(() => [Trend])
  async trends(
    @Arg("filter") {first}: ListFilter,
    input: TrendFilter
  ): Promise<Trend[]> {
  const {source, sourceUrl, imageUrl, body} = Object(input);
  const query = formatQuery({
    source,
    sourceUrl,
    imageUrl,
    body
   });

  return await Trend.find({...query, take: parseInt(first.toString())});
}

  @Query(() => [Trend])
  async newTrends(): Promise<Trend[]> {
    const trends = await Trend.find({ take: 3, order: { createdAt: "DESC" } });
    return trends;
  }

  @Mutation(() => CreateTrendResponse)
  async createTrend(
    @Arg("input") {source, sourceUrl, imageUrl, body}: CreateTrendInput
  ): Promise<CreateTrendResponse> {
    const trend = await Trend.create({
      body,
      source,
      sourceUrl,
      imageUrl,
    }).save();

    return {
      ok: true,
      trend,
    };
  }

  @FieldResolver(() => number)
  async views(@Root() trend: Trend) {
    return await View.find({ where: { trend: trend.id } });
  }
}
