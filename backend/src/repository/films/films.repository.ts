import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Film } from "src/entities/film.entity";
import { Schedule } from "src/entities/schedule.entity";
import { Repository } from "typeorm";


@Injectable()
export class FilmsRepository {

    constructor(
        // внедряем репозиторий для таблицы фильмов
        @InjectRepository(Film)
        private filmRepository: Repository<Film>, 

        //  внедряем репозиторий для таблицы 
        @InjectRepository(Schedule)
        private scheduleRepository: Repository<Schedule>
    ) {}


    // метод для поиска всех фильмов (без расписания)
    findAllFilms() {
        return this.filmRepository.find({});
    }

    // метод для поиска конкретного фильма по id с расписанием
    findOneWithSchedules(filmId: string) {
        return this.filmRepository.findOne({
            where: {id: filmId},
            relations: ['schedules'],
            order: {
                schedules: {
                    daytime: 'ASC'
                }
            }
        })
    }

    // метод для обновления занятых мест
    async updateTakenSeats(filmId: string, scheduleId: string, newTaken: string[] ) {
        // преобразуем массив строк в одну строку - формат бд
        const newTakenSeats = newTaken.join(',');

        // обновляем занятые места 
        return await this.scheduleRepository.update(
            {filmId: filmId, id: scheduleId},
            {taken: newTakenSeats}
        );
    }

}