import { Module } from '@nestjs/common';
import { ShowService } from './show.service';
import { ShowController } from './show.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from 'src/book/entities/book.entity';
import { User } from 'src/user/entities/user.entity';
import { Schedule } from './entities/schedule.entity';
import { Seat } from './entities/seat.entity';
import { Show } from './entities/show.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Show, Schedule, Seat, Book])],
  controllers: [ShowController],
  providers: [ShowService],
})
export class ShowModule {}
