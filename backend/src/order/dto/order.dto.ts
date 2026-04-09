//TODO реализовать DTO для /orders

import { IsArray, IsString } from "class-validator";
import { TicketDto } from "./ticket.dto";

export class OrderDto {
    @IsString()
    email: string;
    @IsString()
    phone: string;
    @IsArray()
    tickets: TicketDto[]
}