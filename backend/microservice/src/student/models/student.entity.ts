import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class StudentEntity {

    @PrimaryGeneratedColumn()
    @Field(type=>Int)
    id: number;

    @Column()
    @Field()
    name: string;

    @Column()
    @Field()
    birthday: Date;

    @Column()
    @Field()
    email: string;

    @Column()
    @Field()
    age: number;

}