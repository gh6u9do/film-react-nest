import { TskvLogger } from "../tskv.logger";

describe('TskvLogger', () => {

    // объявляем переменную в которой будет логгер
    let logger: TskvLogger;
    // объявляем переменную, в которой будет шпион на консоль
    let consoleSpy: jest.SpyInstance;


    beforeEach(() => {
        // крафтим новый экземпляр логгера
        logger = new TskvLogger();

        // вешаем шпиона и глушим вывод сообщений в консоль чтобы не засорять ее
        consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => { });
    });

    afterEach(() => {
        // восстанавливаем работу console.log
        consoleSpy.mockRestore();
    });


    // проверяем что функция лог выводит корректное значение
    it('should log valid JSON', () => {
        // вызываем функцию логгирования
        logger.log('test');

        // проверяем что функция была вызвана один раз
        expect(consoleSpy).toHaveBeenCalledTimes(1);

        // проверяем что console.log внутри функции был вызван с правильным аргументом
        expect(consoleSpy).toHaveBeenCalledWith('level=log\tmessage=test\n');
    })

    // проверяем корректность передачи опциональных параметров
    it('should log message with optional params', () => {
        // вызываем функцию логгирования с доп параметрами
        logger.log('hello', 'param1', 42);

        // проверяем что console.log внутри был вызыван с правильным аргументом
        expect(consoleSpy).toHaveBeenCalledWith('level=log\tmessage=hello\tparam0=param1\tparam1=42\n');
    });



    // проверяем что функция warn выводит корректное значение
    it('should warn valid JSON', () => {
        // вызываем фунцию логгирования 
        logger.warn('warn');

        // проверяем что функция была вызвана один раз
        expect(consoleSpy).toHaveBeenCalledTimes(1);

        // проверяем что console.log внутри функции был вызван с правильным аргументом
        expect(consoleSpy).toHaveBeenCalledWith('level=warn\tmessage=warn\n');
    });

    // проверяем корректность передачи опциональных параметров
    it('should warn message with optional params', () => {
        // вызываем функцию логгирования с доп параметрами
        logger.warn('warn', 'param1', 42);

        // проверяем что передался правильный аргумент
        expect(consoleSpy).toHaveBeenCalledWith('level=warn\tmessage=warn\tparam0=param1\tparam1=42\n');
    });



    // проверяем что функция debug выводит корректное значение
    it('should debug valid JSON', () => {
        // вызываем функцию логгирования
        logger.debug('debug');

        // проверяем что функция была вызвана один раз
        expect(consoleSpy).toHaveBeenCalledTimes(1);

        // проверяем что console.log внутри функции был вызван с правильным аргументом
        expect(consoleSpy).toHaveBeenCalledWith('level=debug\tmessage=debug\n');
    });

    // проверяем корректность передачи опциональных параметров
    it('should debug message with optional params', () => {
        // вызываем логгирование с доп параметрами
        logger.debug('debug', 'param1', 42);

        // проверяем что передался правильный аргумент
        expect(consoleSpy).toHaveBeenCalledWith('level=debug\tmessage=debug\tparam0=param1\tparam1=42\n');
    });



    // проверяем что функция verbose выводит корректное значение
    it('should verbose valid JSON', () => {
        // вызываем функцию логгирования
        logger.verbose('verbose');

        // проверяем что функция была вызвана один раз
        expect(consoleSpy).toHaveBeenCalledTimes(1);

        // проверяем что console.log внутри функции был вызван с правильным аргументом
        expect(consoleSpy).toHaveBeenCalledWith('level=verbose\tmessage=verbose\n');
    });

    // проверяем корректность передачи опциональных параметров
    it('should verbose message with optional params', () => {
        // вызываем логгирования с доп параметрами
        logger.verbose('verbose', 'param1', 42);

        // проверяем что передался правильный аргумент
        expect(consoleSpy).toHaveBeenCalledWith('level=verbose\tmessage=verbose\tparam0=param1\tparam1=42\n');
    });



    // проверем что функция error выводит корректное значение
    it('should error valid JSON', () => {
        // крафтим нового шпиона, т.к. здесь используется console.error
        const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

        // вызываем логгирование
        logger.error('error');

        // проверяем что функция была вызвана один раз
        expect(errorSpy).toHaveBeenCalledTimes(1);

        // проверяем что в шпиона передался правильный аргумент
        expect(errorSpy).toHaveBeenCalledWith('level=error\tmessage=error\n');

        errorSpy.mockRestore();
    });

    // проверяем корректность передачи опциональных параметров
    it('should error message with optional params', () => {
        // крафтим шпиона
        const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        
        // вызываем логгирования с доп парамтером 
        logger.error('error', 'param1', 42);


        // проверяем что передался правильный аргумент
        expect(errorSpy).toHaveBeenCalledWith('level=error\tmessage=error\tparam0=param1\tparam1=42\n');

        errorSpy.mockRestore();
    });
})