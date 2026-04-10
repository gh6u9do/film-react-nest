import { IsArray, IsNumber, ValidateNested } from "class-validator";
import { ScheduleDto } from "./schedule.dto";
import { Type } from "class-transformer";

export class ScheduleResponseDto {
    @IsNumber()
    total: number;
    @IsArray()
    @ValidateNested({each: true})
    @Type(() => ScheduleDto)
    items: ScheduleDto[]
}