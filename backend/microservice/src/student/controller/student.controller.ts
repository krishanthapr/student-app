import { Body, Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Student } from '../models/student.interface';
import { StudentService } from '../service/student.service';

@Controller('students')
export class StudentController {

    constructor(private studentService: StudentService) { }

    @MessagePattern('add')
    add(@Body() student: Student): Promise<any> {
        return this.studentService.add(student);
    }

    @MessagePattern('findall')
    findAll(@Body() data: any): Promise<any> {
        return this.studentService.findAll();
    }

    @MessagePattern('update')
    update(@Body() student: Student): Promise<any> {
        return this.studentService.update(student);
    }

    @MessagePattern('remove')
    remove(@Body() id: number): Promise<any> {
        return this.studentService.remove(id);
    }
}
