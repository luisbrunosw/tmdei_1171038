import { formatQuery } from "../../utils/Utils";
import { Arg, FieldResolver, Mutation, Query, Resolver, Root } from "type-graphql";

import { Trend } from "../../entity/Trend";
import { View } from "../../entity/View";
import { CreateTrendResponse } from "./createTrendResponse";
import { CreateTrendInput } from "./createTrendInput";
import { TrendFilter } from "./TrendFilter";
import { number } from "yup";

@Resolver(() => Trend)
export class TrendResolver {
  @Query(() => [Trend])
  async trends(
    @Arg("input", { nullable: true }) 
    {source, sourceUrl, imageUrl, body}: TrendFilter
  ): Promise<Trend[]> {
  const query = formatQuery({
    source,
    sourceUrl,
    imageUrl,
    body
   });

  return await Trend.find(query);
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
  async views(@Root("trendId") id: string) {
    return await View.count({ where: { trendId: id } });
  }

  @FieldResolver(() => [View])
  async comments(@Root() trend: Trend): Promise<View[]> {
    return await View.find({ where: {trend: trend.id}, order: { createdAt: "DESC" } })
  }
}
