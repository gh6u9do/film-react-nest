import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('FilmsController', () => {
  let controller: FilmsController;
  let filmsService: FilmsService;

  // крафтим мок-объект с функциями
  const mockFilmsService = {
    findAll: jest.fn().mockReturnValue([]),
    findOne: jest.fn().mockReturnValue(null),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [
        {
          provide: FilmsService,
          useValue: mockFilmsService
        }
      ]
    }).compile();

    controller = module.get<FilmsController>(FilmsController);
    filmsService = module.get<FilmsService>(FilmsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // проверяем что возвращаются все фильмы
  it('should return all films', () => {
    // крафтим объект с фильмами
    const mockFilms = [{ id: 1, title: 'Film 1' }, { id: 2, title: 'Film 2' }];

    // мокаем результат выполнения функции
    mockFilmsService.findAll.mockReturnValue(mockFilms);

    // получаем результат
    const result = controller.findAll();

    // проверяем что результат корректный
    expect(result).toEqual(mockFilms);
    expect(mockFilmsService.findAll).toHaveBeenCalled();
  });



  // проверяем что возвращается конкретный фильм по id
  it('should return one film by id', async () => {
    // крафтим возвращаемое значение
    const mockFilm = { id: '1', title: 'Film 1', schedule: [] };

    // мокаем результат выполнения функции
    mockFilmsService.findOne.mockReturnValue(mockFilm);

    // получаем результат
    const result = await controller.findOne('1');

    // проверяем, что результат корректный
    expect(result).toEqual(mockFilm);
    expect(mockFilmsService.findOne).toHaveBeenCalledWith('1');
  });



  //  проверяем что выщывается ошибка 404 если фильм с таким id не существует
  it('should throw 404 if film not found', async () => {
    // мокаем результат выполнения функции
    mockFilmsService.findOne.mockResolvedValue(null);

    // проверяем что вызывается искоючение
    await expect(controller.findOne('999')).rejects.toThrow(
      new HttpException('Film not found', HttpStatus.NOT_FOUND),
    );

    expect(mockFilmsService.findOne).toHaveBeenCalledWith('999');
  });
});
