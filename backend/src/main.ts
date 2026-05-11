import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './exceptions/http-exception.filter';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // получаем ConfigService
  const configService = app.get(ConfigService);
  // получаем порт из env или ставим по умолчанию 3000
  const port = configService.get<number>('PORT', 3000);

  app.setGlobalPrefix("api/afisha");

  app.enableCors();

  // добавляем пайплан валидации
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
    transformOptions: {
      enableImplicitConversion: true,
    },
  }));

  // добавляем глобальный фильтр для ошибок
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(port);
}
bootstrap();
