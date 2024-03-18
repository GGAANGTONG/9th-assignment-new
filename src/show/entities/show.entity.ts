import { IsNotEmpty, IsString, IsNumber, Max, IsEnum } from "class-validator";
import { MAX_PRICE } from "constants/point.constants";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { Schedule } from "./schedule.entity";
import { ShowCategory } from "../types/show_category.types";

@Entity('shows')
export class Show {
  @PrimaryGeneratedColumn({unsigned: true})
  id: number;

  /**
   * 공연 제목
   * @example "국밥이야기"
   */
  @IsNotEmpty({message: '공연명을 입력해 주세요.'})
  @IsString()
  @Column({unique: true})
  title: string;

  /**
   * 공연 소개
   * @example "국밥과 친구들의 가슴 뛰는 모험"
   */
  @IsNotEmpty({message: '공연 설명을 입력해 주세요.'})
  @IsString()
  @Column()
  description: string;

  /**
   * 카테고리
   * @example "Concert"
   */
  @IsNotEmpty({message: '카테고리를 입력해 주세요.'})
  @IsEnum(ShowCategory)
  @Column()
  category:ShowCategory


  /**
   * 공연 장소
   * @example "국밥랜드"
   */
  @IsNotEmpty({message: '장소를 입력해 주세요.'})
  @IsString()
  @Column()
  place: string;

  /**
   * 예매 가격
   * @example "25000"
   */
  @IsNotEmpty({message: '공연 좌석 가격을 입력해 주세요.'})
  @IsNumber()
  @Max(MAX_PRICE, {message: '공연 가격은 50,000포인트를 초과할 수 없습니다.'})
  @Column()
  price: number;

  /**
   * 썸네일
   * @example "https://ilovecharacter.com/news/data/20210927/p1065617115538982_589_thum.jpg"
   */
  @IsNotEmpty({message: '섬네일을 입력해 주세요.'})
  @IsString()
  @Column()
  thumbnail: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  //해당 relation 메서드로 요청이 들어왔을 때 Schedule 클래스의 인스턴스 중 해당 showId와 일치하는 외래키 값을 가진 schedules 키의 벨류로 반환함  
  @OneToMany(() => Schedule, schedule => schedule.show, {cascade: true})
  schedules: Schedule[]
}
