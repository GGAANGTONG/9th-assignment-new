import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Schedule } from 'src/show/entities/schedule.entity';
import { User } from 'src/user/entities/user.entity';
import { Book } from './entities/book.entity';
import { Seat } from 'src/show/entities/seat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book, User, Schedule, Seat]), AuthModule],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
