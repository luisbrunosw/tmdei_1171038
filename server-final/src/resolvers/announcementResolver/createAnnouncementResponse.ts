import { Field, ObjectType } from "type-graphql";

import { Announcement } from "../../domain/Announcement";

@ObjectType()
export class CreateAnnouncementResponse {
  @Field()
  ok: Boolean;

  @Field(() => Announcement)
  announcement: Announcement;
}
