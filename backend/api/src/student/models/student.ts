import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Student {
    @Field()
    id: number;

    @Field()
    name: string;

    @Field()
    birthday: Date;

    @Field()
    email: string;

    @Field()
    age: number;
}