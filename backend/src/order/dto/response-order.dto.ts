import { IsArray, IsNumber, ValidateNested } from "class-validator";
import { ResponseTicketDto } from "./response-ticket.dto";
import { Type } from "class-transformer";


export class ResponseOrderDto {
    @IsNumber()
    total: number;
    @IsArray()
    @ValidateNested({each: true})
    @Type(() => ResponseTicketDto)
    items: ResponseTicketDto[];
}