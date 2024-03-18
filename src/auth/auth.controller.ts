import { Controller, Post, HttpStatus, Body, HttpCode, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signUp.dto';
import { ApiTags } from '@nestjs/swagger';
import { SignInDto } from 'src/user/dto/signIn.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiTags('인증')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  
@Post('/signUp')
async signUp(@Body() signUpDto: SignUpDto) {
  
  /**
   * 회원가입
   * @returns
   */
  const data = await this.authService.signUp(signUpDto) 
  return {
    statusCode: HttpStatus.CREATED,
    message: '회원 가입에 성공하였습니다.',
    data
  }
}

    /**
   * 로그인
   * @param req
   * @param signInDto
   * @returns
   */
    @HttpCode(HttpStatus.OK)
    @UseGuards(LocalAuthGuard)
    @Post('/signIn')
    async signIn (@Request() req, @Body() signInDto: SignInDto) {
      const userId = req.user.id
      const data = await this.authService.signIn(userId)
      return {
        statusCode: HttpStatus.OK,
        message: '로그인에 성공하였습니다.',
        data
      }
    }
    
}
