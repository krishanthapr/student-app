import { Module } from '@nestjs/common';
import { UploadController } from './controller/upload/upload.controller';
import { StudentService } from './service/student.service';
import { BullModule } from '@nestjs/bull';
import { StudentConsumer } from './student.consumer';
import { StudentGateway } from './student.gateway';
import { StudentsResolver } from './resolver/students.resolver';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT)
      }
    }),
    BullModule.registerQueue({
      name: 'add-queue'
    })
  ],
  providers: [StudentService, StudentConsumer, StudentGateway, StudentsResolver],
  controllers: [UploadController]
})
export class StudentModule { }
