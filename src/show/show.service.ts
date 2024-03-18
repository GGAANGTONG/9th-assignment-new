import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateShowDto } from './dto/create-show.dto';
import { FindAllShowDto } from './dto/find-all-show.dto.';
import { Like, Repository } from 'typeorm';
import { Show } from './entities/show.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ShowService {
  constructor(@InjectRepository(Show) private readonly showRepository:Repository<Show>,) {}
  async create(createShowDto: CreateShowDto) {
    const {schedules, seats, ...restOfShow} = createShowDto

    const existingShow = await this.showRepository.findOneBy({title: createShowDto.title})

    if(existingShow) {
      throw new BadRequestException('이미 존재하는 공연명입니다.')
    }

    const show = await this.showRepository.save({
      ...restOfShow,
      schedules: schedules.map(schedule => {
        return{
        ...schedule,
        seat: {
          availableSeats: seats,
          totalSeats: seats
        }
      }})
      }
    )
    return show;;
  }

  async findAll({keyword, category}: FindAllShowDto) {
    const shows = await this.showRepository.find({
      where:{
      ...(keyword && {title: Like(`%${keyword}%`)}),
      ...(category && {category})
    }
    });
    return shows;
  }

  async findOne(id: number) {
    const show = await this.showRepository.findOne({
      where:{id},
      relations: {
        schedules: {
          seat: true
        }
      }
    })
    if(!show) {
      throw new BadRequestException ('공연을 찾을 수 없습니다.')
    }

    return show;
  }

}
