import { IsNotEmpty, IsDateString, IsMilitaryTime } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToOne, OneToMany } from "typeorm";
import { Show } from "./show.entity";
import { Seat } from "./seat.entity";
import { Book } from "src/book/entities/book.entity";

@Entity('schedules')
export class Schedule {

@PrimaryGeneratedColumn({unsigned: true})
id:number;

@Column({unsigned: true})
showId: number;

/**
 * 공연 날짜
 * @example "2024-08-31"
 */
@IsNotEmpty({message: '공연 날짜를 입력해 주세요.'})
@IsDateString()
@Column({type:'date'})
date: Date;

/**
 * 공연 시간
 * @example "20:30"
 */
@IsNotEmpty({message: '공연 시간을 입력해 주세요.'})
@IsMilitaryTime()
@Column({type:'time'})
time: string

@CreateDateColumn()
created_at: Date;

@UpdateDateColumn()
updated_at: Date;

@ManyToOne(() => Show, show => show.schedules, {onDelete: 'CASCADE'})
show: Show

@OneToOne(() => Seat, seat => seat.schedule, {cascade: true})
seat: Seat

@OneToMany(() => Book, book => book.schedule, {cascade:true})
books: Book[]
}