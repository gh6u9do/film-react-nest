import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './exceptions/http-exception.filter';
import { ConfigService } from '@nestjs/config';
import { JsonLogger } from './loggers/json.logger';
import { TskvLogger } from './loggers/tskv.logger';
import { DevLogger } from './loggers/dev.logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  // получаем ConfigService
  const configService = app.get(ConfigService);
  // получаем порт из env или ставим по умолчанию 3000
  const port = configService.get<number>('PORT', 3000);

  // получаем лог формат из переменной окрудения, по умолчанию dev
  const logFormat = configService.get<string>('LOG_FORMAT', 'dev');

  let logger;
  switch (logFormat) {
    case 'json':
      logger = new JsonLogger();
      break;
    case 'tskv': 
      logger = new TskvLogger();
      break;
    default: 
      logger = new DevLogger();
  }

  // подключаем логгер
  app.useLogger(logger);

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