import { FilmsRepository } from 'src/repository/films/films.repository';
import { Injectable } from "@nestjs/common";
import { FilmsResponseDto } from "./dto/films-response.dto";
import { ScheduleResponseDto } from "./dto/schedule-response.dto";
import { FilmDto } from "./dto/film.dto";
import { ScheduleDto } from "./dto/schedule.dto";
import { Film } from 'src/entities/film.entity';
import { Schedule } from 'src/entities/schedule.entity';


@Injectable()
export class FilmsService {
    // внедряем репозиторий
    constructor(private readonly filmsRepository: FilmsRepository) { }

    // конвертер объекта фильма получаемого из бд в объект FilmDto
    private convertToFilmDto(documentFromDB: Film): FilmDto {
        // в в sql лежит просто строка, приводим к массиву делением по запятой или пишем пустой массив если в бд пусто
        const tagsArray = documentFromDB.tags && documentFromDB.tags.length > 0
            ? documentFromDB.tags.split(',')
            : []
        ;

        const filmObject: FilmDto = {
            id: documentFromDB.id,
            rating: documentFromDB.rating ?? 0,
            director: documentFromDB.director ?? '',
            tags: tagsArray,
            title: documentFromDB.title ?? '',
            about: documentFromDB.about ?? '',
            description: documentFromDB.description ?? '',
            image: documentFromDB.image ?? '',
            cover: documentFromDB.cover ?? ''
        }

        return filmObject;
    }



    // конвертер получаемого расписания из бд в объект SheduleDto
    private convertToScheduleDto(documentFromDb: Schedule): ScheduleDto {
        // в sql лежит просто строка, приводим к массиву делением по запятой или пишем пустой массив если в бд пусто
        const takenArray = documentFromDb.taken && documentFromDb.taken.length > 0
            ? documentFromDb.taken.split(',')
            : []
        ;

        const scheduleObject: ScheduleDto = {
            id: documentFromDb.id,
            daytime: documentFromDb.daytime,
            hall: String(documentFromDb.hall),
            rows: documentFromDb.rows,
            seats: documentFromDb.seats,
            price: documentFromDb.price,
            taken: takenArray
        }

        return scheduleObject;
    }



    // функция возвращает информацию о всех фильмах
    async findAll(): Promise<FilmsResponseDto> {

        // получаем документы из бд
        const allFilms = await this.filmsRepository.findAllFilms();
        // считаем количество полученных фильмов
        const total = allFilms.length;
        // конвертируем массив фильмов от бд в FilmDto
        const items = allFilms.map((film) => this.convertToFilmDto(film));

        // формируем объект ответа
        const response: FilmsResponseDto = {
            total: total,
            items: items
        }

        return response;
    }



    // функция возвращает расписание на конкретный фильм
    async findOne(id: string): Promise<ScheduleResponseDto | null> {

        // получаем документ из бд
        const filmObject = await this.filmsRepository.findOneWithSchedules(id);

        // если фильм не найден возвращает null
        if (!filmObject) {
            return null;
        }

        // достаем массив с расписанием
        const schedulesFromDb: Schedule[] = filmObject.schedules;

        // конвертируем полученные объекты расписания в нужный объект ответа
        const items = schedulesFromDb.map((schedule) => this.convertToScheduleDto(schedule));
        // считаем количество элементов
        const total = items.length;

        // формируем объект ответа 
        const response: ScheduleResponseDto = {
            total: total,
            items: items
        }

        return response;
    }

} 