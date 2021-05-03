import { Logger } from "@nestjs/common";
import { Resolver, Query, Args, Mutation } from "@nestjs/graphql";
import { CreateStudentInput } from "../models/input/create-student.input";
import { DeleteStudentInput } from "../models/input/delete-student.input";
import { UpdateStudentInput } from "../models/input/update-student.input";
import { Student } from "../models/student";
import { IStudent } from "../models/student.interface";
import { StudentService } from "../service/student.service";

@Resolver(() => Student)
export class StudentsResolver {
    constructor(private readonly studentService: StudentService) { }

    @Query(() => [Student], { name: 'students' })
    getStudents(): Promise<Student[]> {
        return this.studentService.findAll();
    }

    @Mutation(() => Student)
    createStudent(@Args('createStudentData') createStudentData: CreateStudentInput): Promise<Student> {
        let createStudent = <IStudent>{ name: createStudentData.name, birthday: createStudentData.birthday, email: createStudentData.email }
        return this.studentService.add(createStudent);
    }

    @Mutation(() => Student)
    updateStudent(@Args('updateStudentData') updateStudentData: UpdateStudentInput): Promise<Student> {
        let updateStudent = <IStudent>{ id: updateStudentData.id, name: updateStudentData.name, birthday: updateStudentData.birthday, email: updateStudentData.email }
        return this.studentService.update(updateStudent);
    }

    @Mutation(() => String)
    deleteStudent(@Args('deleteStudentData') deleteStudentData: DeleteStudentInput): Promise<String> {
        return this.studentService.remove(deleteStudentData.id);
    }
}