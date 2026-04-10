import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        // достаем контекст
        const ctx = host.switchToHttp();
        // получаем объект ответа
        const response = ctx.getResponse<Response>();
        // определяем статус код
        const status = exception instanceof HttpException
            ? exception.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR;


        // задаем дефолтное значение сообщения об ошибке
        let errorMessage = 'Internal server error';

        // проверяем exception
        if (exception instanceof HttpException) {
            const exceptionResponse = exception.getResponse();
            // в зависимости от того чем является exceptionResponse извлекаем значение
            errorMessage = typeof exceptionResponse === 'string'
                ? exceptionResponse
                : (exceptionResponse as any).message;
        } else if(exception instanceof Error) {
            errorMessage = exception.message;
        }


        // формируем ответ в формате OpenAPI (только поле error)
        response.status(status).json({
            error: Array.isArray(errorMessage) ? errorMessage[0] : errorMessage,
        });
    }
} 