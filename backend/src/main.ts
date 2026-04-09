import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import 'dotenv/config'
import { HttpExceptionFilter } from './exceptions/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api/afisha");
  app.enableCors();
  // добавляем пайплан валидации
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // добавляем глобальный фильтр для ошибок
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(3000);
}
bootstrap();
