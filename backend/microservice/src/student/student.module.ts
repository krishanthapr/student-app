import { Module } from '@nestjs/common';
import { StudentController } from './controller/student.controller';
import { QueryService } from './service/query.service';
import { StudentService } from './service/student.service';

@Module({
  providers: [StudentService, QueryService],
  controllers: [StudentController]
})
export class StudentModule { }
