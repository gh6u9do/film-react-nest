import { IsNumber, IsString, IsArray, IsUUID } from "class-validator";

//TODO описать DTO для запросов к /films
export class FilmDto {
    @IsString()
    @IsUUID()
    id: string;
    @IsNumber() 
    rating: number;
    @IsString()
    director: string;
    @IsArray()
    @IsString({ each: true })
    tags: string[];
    @IsString()
    title: string;
    @IsString()
    about: string;
    @IsString()
    description: string;
    @IsString()
    image: string;
    @IsString()
    cover: string;
}