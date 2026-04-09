import { IsArray, IsNumber } from "class-validator";
import { ScheduleDto } from "./schedule.dto";

export class ScheduleResponseDto {
    @IsNumber()
    total: number;
    @IsArray()
    items: ScheduleDto[]
}