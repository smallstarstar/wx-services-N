import { Injectable, HttpServer, HttpService, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { UserEntity } from 'src/entities/user.entity';
import WxConfigData from '../../config/wx-config';

export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    @Inject(HttpService) private readonly httpClientService: HttpServer,
  ) { }

  // Partial: 不完全包含
  // createToken(user: Partial<UserEntity>) {
  //   // jwt签名
  //   // 设置token过期时间一周
  //   // tslint:disable-next-line:ban-types
  //   const EXPIRATION: number = 3600 * 24 * 7;
  //   const accessToken = this.jwtService.sign(user, 'secretKey', { expiresIn: '7d' });
  //   return { EXPIRATION, accessToken };
  // }
  /**
   * 账户密码登录方式
   * @param username
   * @param password
   */
  async login(username: string, password: string) {
    const data: any = await this.userService.findByUserNameAndPassword(username, password);
    if (!data) {    // 创建token
      throw new HttpException('参数错误', HttpStatus.BAD_REQUEST);
    } else {
      const payload = {
        id: data.id,
        username: data.username,
        role: data.roleId,
        phone: data.phone,
      };
      const token = this.jwtService.sign(payload);
      return Object.assign(data, { token });
    }
  }

  async validateUser(payload: UserEntity): Promise<any> {
    return await this.userService.findById(payload.id);
  }
  /**
   * 微信登录
   * @param code
   */
  wxLogin(code: any, username: any, userGender: string) {
    const url: any = `${WxConfigData.wxLoginUrl}
    ?appid=${WxConfigData.wxAppid}&secret=${WxConfigData.wxAppSecret}
    &js_code=${code}&grant_type=authorization_code'`;
    // tslint:disable-next-line:no-console
    console.log('==============', url);
    const data: any = this.httpClientService.post(url);
    // 组装token;
    const payload = {
      username,
      userGender,
    };
    const token: any = this.jwtService.sign(payload, {
      // token过期时间 7d;
      expiresIn: '7d',
    });
    const tokenInfo: any = {};
    tokenInfo.token = token;
    tokenInfo.ttl = 60 * 60 * 24 * 7;
    return Object.assign({ data }, { tokenInfo });
  }
}
