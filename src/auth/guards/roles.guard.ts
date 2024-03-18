import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Reflector } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard extends JwtAuthGuard implements CanActivate {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly reflector: Reflector) {
    super()
  }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
  const authenticated = await super.canActivate(context)
  if(!authenticated) {
    throw new UnauthorizedException('잘못된 인증입니다.')
  }

  const requiredRoles = this.reflector.getAllAndOverride(ROLES_KEY, [context.getHandler(), context.getClass()])

  if(!requiredRoles) {
    return true;
  }
  
  const req = context.switchToHttp().getRequest();
  const userId = req.user.id
  const user = await this.userRepository.findOneBy({id:userId})
  
  const hasPermission = requiredRoles.some((role) => role === user.role)
  
    return hasPermission;
  }
}
