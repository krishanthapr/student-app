import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class DeleteStudentInput {
    @Field()
    id: number;
}