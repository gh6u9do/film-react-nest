import { IsArray, IsNumber } from "class-validator";
import { ResponseTicketDto } from "./response-ticket.dto";


// ВАЖНО: у Ticket появляется до поле id

export class ResponseOrderDto {
    @IsNumber()
    total: number;
    @IsArray()
    items: ResponseTicketDto[];
}