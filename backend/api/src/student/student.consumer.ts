import { OnQueueCompleted, Process, Processor } from "@nestjs/bull";
import { Logger } from "@nestjs/common";
import Bull, { Job } from "bull";
import readXlsxFile from 'read-excel-file'
import { IStudent } from "./models/student.interface";
import { StudentService } from "./service/student.service";

@Processor('add-queue')
export class StudentConsumer {

    constructor(private studentService: StudentService) { }

    @Process('add-job')
    async addJob(job: Job<unknown>) {
        await this.addData(job.data);
    }

    async addData(file: any) {
        await readXlsxFile(file.data.buffer.data).then(async (rows) => {
            let nameIndex = rows[0].indexOf("name");
            let emailIndex = rows[0].indexOf("email");
            let birthdayIndex = rows[0].indexOf("birthday");
            for (let i = 1; i < rows.length; i++) {
                rows[i][nameIndex]
                let student = <IStudent>{ name: rows[i][nameIndex], email: rows[i][emailIndex], birthday: rows[i][birthdayIndex] };
                await this.studentService.add(student);
            }
        })
    }
}