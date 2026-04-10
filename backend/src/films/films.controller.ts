import { Controller, Get, HttpException, HttpStatus, Param } from '@nestjs/common';
import { FilmsService } from './films.service';

@Controller('films')
export class FilmsController {
    constructor(private filmsService: FilmsService) {}

    // запрос на получение всех фильмов 
    @Get()
    findAll() {
        return this.filmsService.findAll();
    } 

    // запрос на конкретный фильм по id
    @Get(':id/schedule')
    async findOne(@Param('id') id: string) {
        // пробуем достать фильм по id из запроса
        const result = await this.filmsService.findOne(id);

        
        // если вдруг фильм не нашелся и вернулся null
        if(!result) {
            // вызываем ошибку Not Found
            throw new HttpException('Film not found', HttpStatus.NOT_FOUND);
        }
        
        return result;
    }

} 
