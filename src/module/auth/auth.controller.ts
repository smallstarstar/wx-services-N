import { Controller, Get, Param, HttpStatus, HttpCode, UseInterceptors, ClassSerializerInterceptor, Post } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@Controller()
@ApiTags('认证平台接口')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) { }

  @Get('/login/username/:username/password/:password')
  @ApiOperation({ summary: '用户登录认证' })
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(ClassSerializerInterceptor)
  login(@Param('username') username: string, @Param('password') password: string) {
    return this.authService.login(username, password);
  }

  @Get('/wxlogin/:code/:username/:userGender')
  @ApiOperation({ summary: '小程序授权登录' })
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(ClassSerializerInterceptor)
  wxlogin(@Param('code') code: string, @Param('username') username: string,
          @Param('userGender') userGender: string) {
    return this.authService.wxLogin(code, username, userGender);
  }
}
