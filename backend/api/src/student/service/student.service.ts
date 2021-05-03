import { Injectable, Logger } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { Student } from '../models/student';
import { IStudent } from '../models/student.interface';

@Injectable()
export class StudentService {

    private client: ClientProxy;

    constructor() {
        this.client = ClientProxyFactory.create({
            transport: Transport.TCP,
            options: {
                host: process.env.MICROSERVICE_HOST,
                port: parseInt(process.env.MICROSERVICE_PORT)
            }
        })
    }

    async add(student: IStudent): Promise<any> {
        student.age = this.getAge(new Date(student.birthday))
        var data = await this.client.send('add', student).toPromise().then(res => {
            return this.mapStudentData(res.data.createStudentEntity.studentEntity);
        });
        return data;
    }

    async findAll(): Promise<Student[]> {
        var data: Student[] = await this.client.send('findall', '').toPromise().then(res => {
            return this.mapStudentArray(res.data.allStudentEntities.nodes);
        });
        return data;
    }

    async update(student: IStudent): Promise<any> {
        var data = await this.client.send('update', student).toPromise().then(res => {
            return this.mapStudentData(res.data.updateStudentEntityById.studentEntity);
        });
        return data;
    }

    async remove(id: number): Promise<any> {
        var data = await this.client.send('remove', id).toPromise().then(res => {
            return res.data.deleteStudentEntityById.deletedStudentEntityId;
        });
        return data;
    }

    getAge(dateOfBirth: Date) {
        const today = new Date();
        const diff = today.getTime() - dateOfBirth.getTime();
        return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
    }

    mapStudentArray(data: Student[]) {
        return data.map((item) => ({
            ...item,
            birthday: new Date(item.birthday),
            age: this.getAge(new Date(item.birthday))
        }));
    }

    mapStudentData(data: Student) {
        data.birthday = new Date(data.birthday);
        return data
    }

}
