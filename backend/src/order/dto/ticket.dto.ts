import { IsDateString, IsNumber, IsString, IsUUID, IsOptional } from "class-validator";


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
    
    // приходит со фронта, но не используется
    @IsOptional()
    @IsString()
    day?: string;
    // приходит со фронта, но не используется
    @IsOptional()
    @IsString()
    time?: string;

    @IsNumber()
    row: number;
    @IsNumber()
    seat: number;
    @IsNumber()
    price: number;
}