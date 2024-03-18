import { Injectable } from "@nestjs/common";
import { PickType } from "@nestjs/swagger";
import { Schedule } from "../entities/schedule.entity";

@Injectable()
export class CreateScheduleDto extends PickType(Schedule, ['date', 'time']) {}