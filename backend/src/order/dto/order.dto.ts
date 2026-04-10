//TODO реализовать DTO для /orders

import { IsArray, IsString, ValidateNested } from "class-validator";
import { TicketDto } from "./ticket.dto";
import { Type } from "class-transformer";

export class OrderDto {
    @IsString()
    email: string;
    @IsString()
    phone: string;
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => TicketDto)
    tickets: TicketDto[]
}