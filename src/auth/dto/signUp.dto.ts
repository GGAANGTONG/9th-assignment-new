import { PickType } from "@nestjs/swagger";
import { IsNotEmpty, IsStrongPassword } from "class-validator";
import { User } from "src/user/entities/user.entity";


export class SignUpDto extends PickType(User, ['email', 'password', 'nickname'])  {

  /**
   * 비밀번호 확인
   * @example "Ex@mple!!123"
   */
  @IsNotEmpty({message: '비밀번호 확인 란을 입력해 주세요.'})
  @IsStrongPassword(
    {},
    {
      message: '비밀번호는 영문 알파벳 대,소문자, 숫자, 특수문자(!@#$%^&*)를 포함해야 합니다.'
    })
    passwordConfirm: string;
}
