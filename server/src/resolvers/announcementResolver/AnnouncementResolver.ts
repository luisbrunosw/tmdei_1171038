import { Arg, FieldResolver, Mutation, Query, Resolver, Root } from "type-graphql";

import { Announcement } from "../../domain/Announcement";
import { User } from "../../domain/User";
import { CreateAnnouncementInput } from "./createAnnouncementInput";
import { CreateAnnouncementResponse } from "./createAnnouncementResponse";

@Resolver(() => Announcement)
export class AnnouncementResolver {
  @Query(() => [Announcement])
  async announcements(): Promise<Announcement[]> {
    const anns = await Announcement.find();
    return anns;
  }

  @FieldResolver(() => User)
  async author(@Root() announcement: Announcement): Promise<User> {
    return await User.findOneOrFail(announcement.author)
  }

  @Query(() => Announcement)
  async announcement(
    @Arg("annId") id: string
  ): Promise<Announcement | undefined> {
    const ann = await Announcement.findOne(id);
    return ann;
  }

  @Mutation(() => CreateAnnouncementResponse)
  async createAnnouncement(
    @Arg("input") { author, body, summary }: CreateAnnouncementInput
  ): Promise<CreateAnnouncementResponse> {
    const user = await User.findOneOrFail(author);
    
    const announcement = await Announcement.create({
      author: user.id,
      body,
      summary,
    }).save();

    return {
      ok: true,
      announcement,
    };
  }
}
