import { IsArray, IsNotEmpty, IsNumber, ValidateNested } from "class-validator";
import { FilmDto } from "./film.dto";
import { Type } from "class-transformer";

export class FilmsResponseDto {
    @IsNumber()
    total: number;
    @IsArray()
    @ValidateNested({each: true})
    @Type(() => FilmDto)
    items: FilmDto[];
}