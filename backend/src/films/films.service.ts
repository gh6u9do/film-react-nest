import { FilmsRepository } from 'src/repository/films/films.repository';
import { Injectable } from "@nestjs/common";
import { FilmsResponseDto } from "./dto/films-response.dto";
import { ScheduleResponseDto } from "./dto/schedule-response.dto";
import { FilmDocument, Schedule } from "../repository/films/films-schema";
import { FilmDto } from "./dto/film.dto";
import { ScheduleDto } from "./dto/schedule.dto";


@Injectable()
export class FilmsService {
    // внедряем репозиторий
    constructor(private readonly filmsRepository: FilmsRepository) {}

    // конвертер объекта фильма получаемого из бд в объект FilmDto
    private convertToFilmDto(documentFromDB: FilmDocument): FilmDto {
        const filmObject: FilmDto = {
            id: documentFromDB.id,
            rating: documentFromDB.rating ?? 0,
            director: documentFromDB.director ?? '',
            tags: documentFromDB.tags ?? [],
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
        const scheduleObject: ScheduleDto = {
            id: documentFromDb.id,
            daytime: documentFromDb.daytime,
            hall: String(documentFromDb.hall),
            rows: documentFromDb.rows,
            seats: documentFromDb.seats,
            price: documentFromDb.price,
            taken: documentFromDb.taken
        }

        return scheduleObject;
    }



    // функция возвращает информацию о всех фильмах
    async findAll(): Promise<FilmsResponseDto> { 

        // получаем документы из бд
        const allFilms = await this.filmsRepository.findAll();
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
    async findOne(id: string): Promise<ScheduleResponseDto | null>  {

        // получаем документ из бд
        const filmObject = await this.filmsRepository.findOneById(id);

        // если фильм не найден возвращает null
        if(!filmObject) {
            return null;
        }

        // достаем массив с расписанием
        const schedulesFromDb: Schedule[] = filmObject.schedule;

        // конвертируем полученные объекты расписания в нужный объект ответа
        const items = schedulesFromDb.map((schedule) => this.convertToScheduleDto(schedule));
        // считаем количество элементов
        const total = items.length;

        // формируем объект ответа 
        const response:ScheduleResponseDto = {
            total: total,
            items: items
        }

        return response;
    }

} 