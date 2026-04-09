import { IsString, IsUUID } from "class-validator";
import { TicketDto } from "./ticket.dto";

export class ResponseTicketDto extends TicketDto {
    @IsString()
    @IsUUID()
    id: string;
}