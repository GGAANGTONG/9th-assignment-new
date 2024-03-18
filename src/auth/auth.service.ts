import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { SignUpDto } from './dto/signUp.dto';
import bcrypt from 'bcrypt'
import { DEFAULT_POINT } from 'constants/point.constants';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
constructor(
  private readonly configService: ConfigService,
  @InjectRepository(User) private readonly userRepository: Repository<User>,
  private userService: UserService,
  private readonly jwtService: JwtService
  ){}

  async signUp({email, password, passwordConfirm, nickname}: SignUpDto) {
    const isPasswordConfirmed = password === passwordConfirm;

    if(!isPasswordConfirmed) {
      throw new BadRequestException('비밀번호와 비밀번호 확인이 서로 일치하지 않습니다.')
    };

    const existedUser = await this.userService.findOne(email, password);
    if(existedUser) {
      throw new BadRequestException('이미 가입된 이메일입니다.')
    }
    const hashRound = await this.configService.get<number>('PASSWORD_HASH_ROUND');
    const hashedPassword = await bcrypt.hashSync(password,hashRound);

    const user = await this.userRepository.save({
      email, password: hashedPassword, nickname, points: DEFAULT_POINT
    });

    delete user.password;

    return user
  }

    async signIn(userId: number) {
      const payload = {id: userId};
  
      const accessToken = this.jwtService.sign(payload)
  
      return accessToken
    }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOne(email, password)
    return user
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }


}
