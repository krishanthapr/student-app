import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class UpdateStudentInput {
    @Field()
    id: number;

    @Field()
    name: string;

    @Field()
    birthday: Date;

    @Field()
    email: string;
}