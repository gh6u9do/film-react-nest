import { Injectable, LoggerService } from "@nestjs/common";

@Injectable()
export class TskvLogger implements LoggerService {
    private formatMessage(level: string, message: any, optionalParams: any[]): string {

        let optionalString = '';
        // формируем строку с опциональными параметрами
        if (optionalParams.length > 0) {
            optionalString = '\t' + optionalParams.map((param, indexNum) => {
                if(typeof param === 'object') {
                    return `param${indexNum}=${JSON.stringify(param)}`;
                } else {
                    return `param${indexNum}=${param}`;
                }
            }).join('\t');
        }


        let stringMessage = '';
        // формируем корректную строку с сообщением
        if (typeof message === 'object') {
            stringMessage = JSON.stringify(message);
        } else {
            stringMessage = message;
        }

        return `level=${level}\tmessage=${stringMessage}${optionalString}\n`;
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