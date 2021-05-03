import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

const logger = new Logger('Main');

const microserviceOptions = {
  transport: Transport.TCP,
  options: {
    host: process.env.MICROSERVICE_HOST,
    port: parseInt(process.env.MICROSERVICE_PORT)
  }
}

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, microserviceOptions);
  await app.listen(() => {
    logger.log('Microservice is listening...');
  });
}
bootstrap();
