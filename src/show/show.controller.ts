import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, HttpStatus, Query } from '@nestjs/common';
import { ShowService } from './show.service';
import { CreateShowDto } from './dto/create-show.dto';
import { FindAllShowDto } from './dto/find-all-show.dto.';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UserRole } from 'src/user/types/userRole.type';

@ApiTags('공연')
@Controller('show')
export class ShowController {
  constructor(private readonly showService: ShowService) {}

  /**
   * 공연 생성
   * @param createShowDto
   * @returns
   */
  @ApiBearerAuth()
  @Roles(UserRole.Admin)
  @UseGuards(RolesGuard)
  @Post('/createShow')
  async create(@Body() createShowDto: CreateShowDto) {
    const data = await this.showService.create(createShowDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: '공연이 생성되었습니다.',
      data
    }
  }

  /**
   * 공연 목록 조회 (검색))
   * @param findAllShowDto
   */
  @Get()
  async findAll(@Query() findAllShowDto:FindAllShowDto) {
    const data = await this.showService.findAll(findAllShowDto);
    return {
      statusCode: HttpStatus.OK,
      message: '공연이 목록이 조회되었습니다.',
      data
    }
  }

  /**
   * 공연 상세 조회
   * @param id
   * @returns
   */
  @Get('/:id')
  async findOne(@Param('id') id: string) {
    const data = await this.showService.findOne(+id);
    return {
      statusCode: HttpStatus.OK,
      message: '선택하신 공연의 상세 정보입니다.',
      data
    }
  }


}
