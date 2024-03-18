import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, HttpStatus } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UserRole } from 'src/user/types/userRole.type';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  /**
   * 예매하기
   * @param createBookDto
   */
  @ApiBearerAuth()
  @Roles(UserRole.Audience)
  @UseGuards(RolesGuard)
  @Post()
  async create(@Request() req, @Body() createBookDto: CreateBookDto) {
    const userId = req.user.id
    const data = await this.bookService.create(userId, createBookDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: '예매가 완료됐습니다.',
      data
    } 
  }

  /**
   * 예매 목록 조회
   * @returns
   */
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Request() req) {
    const userId = req.user.id;
    const data = await this.bookService.findAll(userId);
    return {
      statusCode: HttpStatus.OK,
      message: '예매 목록 조회에 성공하였습니다.',
      data
    }
  }

  /**
   * 예매 상세 조회
   * @param id
   * @returns
   */
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Request() req ) {
    const userId = req.user.id;
    const data = this.bookService.findOne(+id, userId);

    return {
      statusCode: HttpStatus.OK,
      message: '예매 상세 조회에 성공하였습니다.',
      data
    } 
  }


  }
