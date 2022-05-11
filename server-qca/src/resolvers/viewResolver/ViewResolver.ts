import { Arg, FieldResolver, Mutation, Query, Resolver, Root } from "type-graphql";

import { View } from "../../domain/View";
import { Trend } from "../../domain/Trend";
import { User } from "../../domain/User";
import { CreateViewInput } from "./CreateViewInput";
import { CreateViewResponse } from "./CreateViewResponse";

@Resolver(() => View)
export class ViewResolver {
  @Query(() => String)
  async views(@Arg("trendId") id: string) {
    return await View.count({ where: { trendId: id } });
  }

  @Mutation(() => CreateViewResponse)
  async createView(@Arg("input") {trend, author}: CreateViewInput): Promise<CreateViewResponse> {
    const trendObj = await Trend.findOneOrFail(trend);
    const user = await User.findOneOrFail(author);

    const view = await View.create({
      trend: trendObj.id,
      author: user.id,
    }).save();

    return {
        ok: true,
        view,
      };
  }

  @FieldResolver(() => User)
  async author(@Root() view: View): Promise<User> {
    return await User.findOneOrFail(view.author)
  }

  @FieldResolver(() => Trend)
  async trend(@Root() view: View): Promise<Trend> {
    return await Trend.findOneOrFail(view.trend)
  }
}
