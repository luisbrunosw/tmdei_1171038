import { Arg, Mutation, Query, Resolver } from "type-graphql";

import { Announcement } from "../../entity/Announcement";
import { CreateAnnouncementInput } from "./createAnnouncementInput";
import { CreateAnnouncementResponse } from "./createAnnouncementResponse";

@Resolver()
export class AnnouncementResolver {
  @Query(() => [Announcement])
  async announcements(): Promise<Announcement[]> {
    const anns = await Announcement.find();
    return anns;
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
    const announcement = await Announcement.create({
      author,
      body,
      summary,
    }).save();

    return {
      ok: true,
      announcement,
    };
  }
}
