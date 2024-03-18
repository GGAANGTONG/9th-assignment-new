import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository:Repository<User>
  ) {}
  
  async findOneById(id: number) {
    const user = await this.userRepository.findOne({where:{id}})
    return user;
  }

  async findOne(email: string, password: string) {
    const user = await this.userRepository.findOneBy({email, password})
    return user;
  }


}

