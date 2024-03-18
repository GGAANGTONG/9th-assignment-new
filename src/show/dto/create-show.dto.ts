import { PickType } from "@nestjs/swagger";
import { Show } from "../entities/show.entity";
import { Injectable } from "@nestjs/common";
import { IsNotEmpty, IsNumber, ValidateNested } from "class-validator";
import { CreateScheduleDto } from "./create-scehdule.dto";
import { Type } from "class-transformer";

@Injectable()
export class CreateShowDto extends PickType(Show, ['title', 'description', 'category', 'place', 'price', 'thumbnail']) {

  /**
   * 공연 스케쥴
   * 
   */
  @ValidateNested()
  @Type(() => CreateScheduleDto)
  schedules: CreateScheduleDto[]

  /**
   * 좌석 수
   * @example 100
   */
  @IsNotEmpty({message: '좌석 수를 입력해 주세요.'})
  @IsNumber()
  seats: number;
}
