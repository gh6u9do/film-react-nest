import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { OrderDto } from "./dto/order.dto";
import { ResponseOrderDto } from "./dto/response-order.dto";
import { randomUUID } from 'crypto';
import { FilmsRepository } from "src/repository/films/films.repository";
import { FilmDocument } from "src/repository/films/films-schema";

@Injectable()
export class OrderService {

    constructor(private filmsRepository: FilmsRepository) { }

    // метод создает новый заказ
    async createOrder(order: OrderDto): Promise<ResponseOrderDto> {

        // находим билеты из заказа
        const tickets = order.tickets;

        // объявляем пустой массив для получения фильмов из бд
        const filmsFromDb: FilmDocument[] = [];

        // для каждого билета чекаем фильм и место
        for (const ticket of tickets) {
            // находим фильм по id
            const film = await this.filmsRepository.findOneById(ticket.film);

            // если фильма нет выкидываем ошибку
            if (!film) {
                throw new HttpException(`Film with id ${ticket.film} not found`, HttpStatus.BAD_REQUEST);
            }

            // чекаем сеанс
            const session = film.schedule.find((session) => session.id === ticket.session);
            // если сеанса нет, то выкидываем ошибку
            if (!session) {
                throw new HttpException(`Session with id ${ticket.session} not found`, HttpStatus.BAD_REQUEST);
            }

            // записываем в заданном формате занятое место
            const seatKey = `${ticket.row}:${ticket.seat}`;

            // проверяем если в массиве уже есть такая строка, отклоняем запрос
            if (session.taken.includes(seatKey)) {
                throw new HttpException(`Seat ${seatKey} already taken`, HttpStatus.BAD_REQUEST);
            }

            // если все хорошо пушим фильм в массив
            filmsFromDb.push(film);
        }


        // если все проверки пройдены, обновляем занятые места
        for (const ticket of tickets) {
            // находим фильм который надо обновить из массива
            const film = filmsFromDb.find((film) => film.id === ticket.film);

            // находим сеанс 
            const schedule = film.schedule.find(s => s.id === ticket.session);

            // записиваем в заданном формате занимаемое место
            const seatKey = `${ticket.row}:${ticket.seat}`;

            // добавляем к уже существующим местам новое занятое
            const newTaken = [...schedule.taken, seatKey];

            // обновляем локальный объект (для следующих билетов на тот же сеанс)
            schedule.taken = newTaken;

            // обновляем занятые места
            await this.filmsRepository.updateTakenSeats(
                ticket.film,
                ticket.session,
                newTaken
            );

        }


        // формируем ответ
        const items = order.tickets.map((ticket) => ({
            ...ticket,
            id: randomUUID()
        }));

        // возвращаем результат
        return {
            total: items.length,
            items: items
        };
    }

}