import { Controller, Logger, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { StudentGateway } from 'src/student/student.gateway';
import { Socket } from 'socket.io';
import { diskStorage } from 'multer';
import { createWriteStream } from 'fs'

@Controller('upload')
export class UploadController {

    constructor(@InjectQueue('add-queue') private queue: Queue, private studentGateway: StudentGateway) { }

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile() file: Express.Multer.File) {
        await this.queue.add('add-job', {
            data: file
        })
        this.queue.on("completed", (jobId, result) => {
            const message = {
                name: "add_job",
                text: "Successfully read"
            }
            let client: Socket;
            this.studentGateway.handleMessage(client, JSON.stringify(message));
            this.queue.removeAllListeners()
        });
    }
}
