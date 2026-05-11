import { Module } from '@nestjs/common';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Film } from 'src/entities/film.entity';
import { Schedule } from 'src/entities/schedule.entity';
import { FilmsRepository } from 'src/repository/films/films.repository';

@Module({
  imports: [
    // регаем в TypeORM сущности
    TypeOrmModule.forFeature([Film, Schedule])
  ],
  exports: [FilmsRepository],
  controllers: [FilmsController],
  providers: [FilmsService, FilmsRepository]
})
export class FilmsModule { } 
