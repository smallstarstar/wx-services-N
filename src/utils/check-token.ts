import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../module/user/user.service';
import { JwtService } from '@nestjs/jwt';
@Injectable()
class CheckToken {
  constructor(private userService: UserService, private jwtService: JwtService) { }
  async  checkToken(token: any, user: any) {
    if (!token) {
      throw new HttpException('未认证', HttpStatus.UNAUTHORIZED);
    }

    if (/Bearer/.test(token)) {
      // 不需要 Bearer，否则验证失败
      token = token.split(' ').pop();
    }
    const tokenUser = this.jwtService.decode(token) as any;

    const id = tokenUser.id;

    if (!id) {
      throw new HttpException('未认证', HttpStatus.UNAUTHORIZED);
    }

    const exist = await this.userService.findById(id);
    if (exist.id !== user.id && exist.roleId !== 1) {
      throw new HttpException('无权处理', HttpStatus.FORBIDDEN);
    }
  }
}
export default CheckToken;
