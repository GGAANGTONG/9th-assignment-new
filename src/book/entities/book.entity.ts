import { Schedule } from "src/show/entities/schedule.entity";
import { User } from "src/user/entities/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, ManyToOne } from "typeorm";

@Entity('books')
export class Book {

  @PrimaryGeneratedColumn({unsigned: true})
  id: number;

  @Column({unsigned: true})
  userId: number;

  @Column({unsigned: true})
  scheduleId: number;

  @CreateDateColumn()
  created_at: number;

  @UpdateDateColumn()
  updated_at: number;

  @ManyToOne(()=> User, user => user.books, {onDelete: 'CASCADE'})
  user: User
  
  @ManyToOne(()=> Schedule, {onDelete: 'CASCADE'})
  schedule: Schedule
}
