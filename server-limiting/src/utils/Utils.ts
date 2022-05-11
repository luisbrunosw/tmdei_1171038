import { Field, InputType } from "type-graphql";
import { createIntScalar } from 'graphql-scalar';

export const removeNullKeys= (obj: any) => {
    Object.keys(obj).forEach(key => {
    if (!obj[key]) {
        delete obj[key];
    }
    });
    return obj;
}

export const formatQuery= (obj: any) => {
    return {where: removeNullKeys(obj)};
}

const PaginationAmount = createIntScalar({
    // @ts-ignore
    name: "PaginationAmount",
    minimum: 1,
    maximum: 100
  });

@InputType()
export default class ListFilter {
  @Field(() => PaginationAmount)
  first: typeof PaginationAmount
}
