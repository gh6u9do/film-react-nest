import { JsonLogger } from "../json.logger"

describe('JsonLogger', () => {

    // объявляем переменную в которой будет логгер
    let logger: JsonLogger;
    // объявляем переменную в которой будет шпион на консоль
    let consoleSpy: jest.SpyInstance;



    beforeEach(() => {
        // перед каждым тестом крафтим новый экземпляр JsonLogger
        logger = new JsonLogger();

        // вешаем шпиона и глушим вывод сообщений в консоль чтобы не засорять ее
        consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => { });
    })



    afterEach(() => {
        // после каждого теста восстанавливаем оригинальный console.log
        consoleSpy.mockRestore();
    })



    // проверяем что функция лог выводит корректное значение
    it('should log valid JSON', () => {
        // вызываем функцию логгирования
        logger.log('test');

        // проверяем что функция была вызвана один раз
        expect(consoleSpy).toHaveBeenCalledTimes(1);

        // проверяем что console.log внутри функции был вызван с правильным аргументом
        expect(consoleSpy).toHaveBeenCalledWith('{"level":"log","message":"test","optionalParams":[]}');
    })

    // проверяем корректность передачи опциональных параметров
    it('should log message with optional params', () => {
        // вызываем функцию логгирования с доп параметрами
        logger.log('hello', 'param1', 42);

        // проверяем что console.log внутри был вызыван с правильным аргументом
        expect(consoleSpy).toHaveBeenCalledWith(
            '{"level":"log","message":"hello","optionalParams":["param1",42]}'
        );
    });



    // проверяем что функция warn выводит корректное значение
    it('should warn valid JSON', () => {
        // вызываем фунцию логгирования 
        logger.warn('warn');

        // проверяем что функция была вызвана один раз
        expect(consoleSpy).toHaveBeenCalledTimes(1);

        // проверяем что console.log внутри функции был вызван с правильным аргументом
        expect(consoleSpy).toHaveBeenCalledWith('{"level":"warn","message":"warn","optionalParams":[]}');
    });

    // проверяем корректность передачи опциональных параметров
    it('should warn message with optional params', () => {
        // вызываем функцию логгирования с доп параметрами
        logger.warn('warn', 'param1', 42);

        // проверяем что передался правильный аргумент
        expect(consoleSpy).toHaveBeenCalledWith('{"level":"warn","message":"warn","optionalParams":["param1",42]}');
    });



    // проверяем что функция debug выводит корректное значение
    it('should debug valid JSON', () => {
        // вызываем функцию логгирования
        logger.debug('debug');

        // проверяем что функция была вызвана один раз
        expect(consoleSpy).toHaveBeenCalledTimes(1);

        // проверяем что console.log внутри функции был вызван с правильным аргументом
        expect(consoleSpy).toHaveBeenCalledWith('{"level":"debug","message":"debug","optionalParams":[]}');
    });

    // проверяем корректность передачи опциональных параметров
    it('should debug message with optional params', () => {
        // вызываем логгирование с доп параметрами
        logger.debug('debug', 'param1', 42);

        // проверяем что передался правильный аргумент
        expect(consoleSpy).toHaveBeenCalledWith('{"level":"debug","message":"debug","optionalParams":["param1",42]}');
    });



    // проверяем что функция verbose выводит корректное значение
    it('should verbose valid JSON', () => {
        // вызываем функцию логгирования
        logger.verbose('verbose');

        // проверяем что функция была вызвана один раз
        expect(consoleSpy).toHaveBeenCalledTimes(1);

        // проверяем что console.log внутри функции был вызван с правильным аргументом
        expect(consoleSpy).toHaveBeenCalledWith('{"level":"verbose","message":"verbose","optionalParams":[]}');
    });

    // проверяем корректность передачи опциональных параметров
    it('should verbose message with optional params', () => {
        // вызываем логгирования с доп параметрами
        logger.verbose('verbose', 'param1', 42);

        // проверяем что передался правильный аргумент
        expect(consoleSpy).toHaveBeenCalledWith('{"level":"verbose","message":"verbose","optionalParams":["param1",42]}');
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
        expect(errorSpy).toHaveBeenCalledWith('{"level":"error","message":"error","optionalParams":[]}');

        errorSpy.mockRestore();
    });

    // проверяем корректность передачи опциональных параметров
    it('should error message with optional params', () => {
        // крафтим шпиона
        const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        
        // вызываем логгирования с доп парамтером 
        logger.error('error', 'param1', 42);


        // проверяем что передался правильный аргумент
        expect(errorSpy).toHaveBeenCalledWith('{"level":"error","message":"error","optionalParams":["param1",42]}');

        errorSpy.mockRestore();
    });
})  