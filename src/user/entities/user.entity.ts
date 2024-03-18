import { IsNotEmpty, IsEmail, IsStrongPassword, IsNumber, IsEnum, IsString } from "class-validator";

import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm"
import { UserRole } from "../types/userRole.type";
import { Book } from "src/book/entities/book.entity";


@Entity('users')
export class User {

@PrimaryGeneratedColumn({unsigned: true})
id: number;

/**
 * 이메일
 * @example "gookbab@gookbab.com"
 */
@IsNotEmpty({message: '이메일을 입력해 주세요.'})
@IsEmail()
@Column()
email: string;

/**
 * 비밀번호
 * @example "Ex@mple!!123"
 */
@IsNotEmpty({message: '비밀번호를 입력해 주세요.'})
@IsStrongPassword(
  {},
  {
    message: '비밀번호는 영문 알파벳 대,소문자, 숫자, 특수문자(!@#$%^&*)를 포함해야 합니다.'
  }
  )
@Column({select:false})
password: string;

/**
 * 닉네임
 * @example "국밥대장"
 */
@IsNotEmpty({message: '닉네임을 입력해 주세요.'})
@IsString()
@Column()
nickname: string;


@IsNumber()
@Column({unsigned: true})
points: number;

@IsEnum(UserRole)
@Column({type: 'enum', enum: UserRole, default: UserRole.Audience})
role: UserRole;

@CreateDateColumn({name: 'created_at'})
created_at: Date;

@UpdateDateColumn({name: 'updated_at'})
updated_at: Date

@OneToMany(() => Book, book => book.user, {cascade: true})
books:Book[]
}
