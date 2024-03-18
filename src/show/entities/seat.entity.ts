import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from "typeorm";
import { Schedule } from "./schedule.entity";

@Entity('seats')
export class Seat {
@PrimaryGeneratedColumn({unsigned: true})
id: number;

@Column({unsigned: true})
scheduleId: number;

@Column({unsigned: true, type: 'integer'})
availableSeats: number;

@Column({unsigned: true, type: 'integer'})
totalSeats: number;

@CreateDateColumn()
created_at: Date;

@UpdateDateColumn()
updated_at: Date;

@OneToOne(() => Schedule, schedule => schedule.seat, {onDelete: 'CASCADE'})
@JoinColumn()
schedule: Schedule[]
}