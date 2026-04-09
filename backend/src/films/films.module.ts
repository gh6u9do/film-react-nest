import { Module } from '@nestjs/common';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Film, FilmSchema } from '../repository/films/films-schema';
import { FilmsRepository } from 'src/repository/films/films.repository';

@Module({
  imports: [
    // регаем схему документов фильмов в модуле
    MongooseModule.forFeature([{ name: Film.name, schema: FilmSchema }])
  ],
  exports: [FilmsRepository],
  controllers: [FilmsController],
  providers: [FilmsService, FilmsRepository]
})
export class FilmsModule { } 
