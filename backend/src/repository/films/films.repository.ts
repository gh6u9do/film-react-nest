import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Film, FilmDocument } from "./films-schema";
import { Model } from "mongoose";

@Injectable()
export class FilmsRepository {

    // внедряем FilmsModel 
    constructor(@InjectModel(Film.name) private filmModel: Model<FilmDocument>) { }

    // метод для поиска всех фильмов
    findAll(): Promise<FilmDocument[]> {
        // возвращаем все документы из коллекции фильмов
        return this.filmModel.find({}).exec();
    }

    // метод для поиска конкретного фильма по id
    findOneById(id: string): Promise<FilmDocument | null> {
        // возвращаем найденный фильм (если такой есть в бд)
        return this.filmModel.findOne({ 'id': id }).exec();
    }

    // метод для обновления занятых мест
    async updateTakenSeats(filmId: string, scheduleId: string, newTaken: string[]) {
        // обновляем данные в бд по полученному id фильма и id сеанса
        await this.filmModel.updateOne(
            { 
                // ищем нужный фильм по id
                id: filmId, 
                // ищем нужный сеанс по id
                'schedule.id': scheduleId }, 
            // обновляем массив зарезервированных мест
            {$set: { 'schedule.$.taken': newTaken }}
        ).exec();
    }
}