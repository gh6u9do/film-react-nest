import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        // достаем контекст
        const ctx = host.switchToHttp();
        // получаем объект ответа
        const response = ctx.getResponse<Response>();
        // получаем статус
        const status = exception.getStatus();

        // получаем оригинальное сообщение ошибки
        const exceptionResponse = exception.getResponse();
        const message = typeof exceptionResponse === 'string'
            ? exceptionResponse
            : (exceptionResponse as any).message;

        // формируем ответ в формате OpenAPI (только поле error)
        response.status(status).json({
            error: Array.isArray(message) ? message[0] : message,
        });
    }
}