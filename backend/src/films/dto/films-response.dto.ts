import { IsNotEmpty, IsNumber } from "class-validator";
import { FilmDto } from "./film.dto";

export class FilmsResponseDto {
    @IsNumber()
    total: number;
    @IsNotEmpty()
    items: FilmDto[];
}