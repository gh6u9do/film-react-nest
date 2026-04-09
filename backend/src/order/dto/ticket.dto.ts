import { IsDateString, IsNumber, IsString, IsUUID } from "class-validator";


export class TicketDto {
    @IsString()
    @IsUUID()
    film: string;
    @IsString()
    @IsUUID()
    session: string;
    @IsString()
    @IsDateString()
    daytime: string;
    @IsNumber()
    row: number;
    @IsNumber()
    seat: number;
    @IsNumber()
    price: number;
}