import { Field, InputType } from "type-graphql";

@InputType()
export class CreateViewInput {
  @Field()
  trend: string;

  @Field()
  author: string;
}