import { Field, InputType } from "type-graphql";

@InputType()
export class CreateTrendInput {
  @Field()
  source: string;

  @Field({ nullable: true })
  sourceUrl: string;

  @Field({ nullable: true })
  imageUrl: string;

  @Field()
  body: string;
}