import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "src/auth/auth.service";
import { SignInDto } from "src/user/dto/signIn.dto";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService:AuthService) {
    super({
      usernameField: 'email'
    })
  }


  async validate({email, password}: SignInDto): Promise<any> {
    const user = await this.authService.validateUser(email, password)
    if(!user) {
      throw new UnauthorizedException('회원 정보가 존재하지 않습니다.')
    }
    return user
  }
}

  //PassportStrategy에서는 dto를 못쓰나?