import { IsNumber, IsString, IsArray, IsDateString, IsUUID } from "class-validator"

export class ScheduleDto {
    @IsString()
    @IsUUID()
    id: string; 
    @IsString()
    @IsDateString()
    daytime: string;
    @IsString()
    hall: string;
    @IsNumber()
    rows: number;
    @IsNumber()
    seats: number;
    @IsNumber()
    price: number;
    @IsArray()
    @IsString({ each: true })
    taken: string[];
}