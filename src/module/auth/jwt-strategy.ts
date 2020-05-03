import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserEntity } from 'src/entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      // 从接口中获取token
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'jwt',
    });
  }
  /**
   * 解析token;
   * @param payload
   */
  async validate(payload: UserEntity) {
    const user = await this.authService.validateUser(payload);

    if (!user) {
      throw new UnauthorizedException('身份验证失败');
    }
    return user;
  }
}
