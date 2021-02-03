import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { applicationPort } from './config/env-vars';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(applicationPort);
}
bootstrap();
