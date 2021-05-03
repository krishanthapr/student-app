import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { Student } from '../models/students/student';

@Injectable({
  providedIn: 'root'
})
export class GraphqlService {

  constructor(private apollo: Apollo) { }

  getData(): Promise<any> {
    return this.apollo.query<any>({
      query: gql`
          query {
            students{
              id
              name
              email
              birthday
              age
            }
          }
        `
    }).toPromise();
  }

  putData(student: Student): Promise<any> {
    return this.apollo.mutate<any>({
      mutation: gql`
        mutation {
          updateStudent(updateStudentData:{id:${student.id}, name: "${student.name}", email: "${student.email}", birthday: "${student.birthday}"}){
            id
            name
            email
            birthday
            age
          }
        }
      `
    }).toPromise();
  }

  deleteData(id: number): Promise<any> {
    return this.apollo.mutate<any>({
      mutation: gql`
        mutation {
          deleteStudent(deleteStudentData:{id: ${id}})
        }
      `
    }).toPromise();
  }
}
