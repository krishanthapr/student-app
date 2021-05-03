import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class StudentEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    birthday: Date;

    @Column()
    email: string;

    @Column()
    age: number;

}