import { Injectable, LoggerService} from "@nestjs/common";

@Injectable()
export class JsonLogger implements LoggerService {
    // функция, которая приводит сообщение к нужному формату
    formatMessage(level: string, message: any, optionalParams: any[]) {
        return JSON.stringify({ level, message, optionalParams });
    }

    error(message: any, ...optionalParams: any[]) {
        console.error(this.formatMessage('error', message, optionalParams));
    }

    log(message: any, ...optionalParams: any[]) {
        console.log(this.formatMessage('log', message, optionalParams));
    }

    warn(message: any, ...optionalParams: any[]) {
        console.log(this.formatMessage('warn', message, optionalParams));
    }

    debug(message: any, ...optionalParams: any[]) {
        console.log(this.formatMessage('debug', message, optionalParams));
    }

    verbose(message: any, ...optionalParams: any[]) {
        console.log(this.formatMessage('verbose', message, optionalParams));
    }
}   