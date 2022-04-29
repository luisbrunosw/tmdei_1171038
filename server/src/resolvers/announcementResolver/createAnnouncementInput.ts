import { Field, InputType } from "type-graphql";

@InputType()
export class CreateAnnouncementInput {
  @Field()
  author: string;

  @Field()
  body: string;

  @Field()
  summary: string;
}
