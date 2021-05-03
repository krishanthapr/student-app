import { Injectable } from '@nestjs/common';
import { Student } from '../models/student.interface';

@Injectable()
export class QueryService {

    getAddQuery(student: Student) {
        const age = this.getAge(new Date(student.birthday))
        return `mutation {
            createStudentEntity(
              input: { studentEntity: { name: "${student.name}", email: "${student.email}", age: ${age}, birthday: "${student.birthday}"} }
            ) {
              studentEntity {
                id
                name
                email
                birthday
                age
              }
            }
          }`
    }

    getFindAllQuery() {
        return `query {
            allStudentEntities{
              nodes {
                name
                id
                email
                birthday
              }
            }
          }`
    }

    getUpdateQuery(student: Student) {
        const age = this.getAge(new Date(student.birthday))
        return `mutation {
                    updateStudentEntityById(
                      input: { id: ${student.id}, studentEntityPatch: { name: "${student.name}", email: "${student.email}", age: ${age}, birthday: "${student.birthday}" } }
                    ) {
                      studentEntity {
                        id
                        name
                        birthday
                        email
                        age
                      }
                    }
                  }`
    }

    getDeleteQuery(id: number) {
        return `mutation {
            deleteStudentEntityById(input: { id: ${id} }) {
              deletedStudentEntityId
            }
          }`
    }

    getAge(dateOfBirth: Date) {
        const today = new Date();
        const diff = today.getTime() - dateOfBirth.getTime();
        return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
    }
}
