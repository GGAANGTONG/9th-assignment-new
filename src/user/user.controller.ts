import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, HttpStatus, HttpCode } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';



@ApiTags('회원정보')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * 회원정보
   * @param req
   * @returns
   */
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  async findOne(@Request() req) {
    const userId = req.user.id
    const data = await this.userService.findOneById(userId);
    return {
      statusCode: HttpStatus.OK,
      message: '회원 정보 조회에 성공하였습니다.',
      data
    }
  }

}
