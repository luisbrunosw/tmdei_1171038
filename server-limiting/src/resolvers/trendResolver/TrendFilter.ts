import { Field, InputType } from "type-graphql";

@InputType()
export class TrendFilter {
  @Field({ nullable: true })
  source: string;

  @Field({ nullable: true })
  sourceUrl: string;

  @Field({ nullable: true })
  imageUrl: string;

  @Field({ nullable: true })
  body: string;
}