import { Controller, Post, Get, Body, HttpStatus, HttpCode, HttpException, Request, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserModel } from '../../model/user-model';
// import { JwtService } from '@nestjs/jwt';


@Controller()
@ApiTags('用户类接口')
export class UserController {
  constructor(
    private readonly userService: UserService
    // private readonly jwtService: JwtService
  ) { }


  @Post('/registor')
  @ApiOperation({ summary: '用户登录' })
  @HttpCode(HttpStatus.CREATED)
  userRegistor(@Request() req, @Body() userModel: UserModel) {
    // await this.checkToken(req);
    return this.userService.createdUser(userModel);
  }
  // token验证
  //  async checkToken(req) {
  //     let token = req.headers.authorization;
  //     if(!token) {
  //       throw new HttpException('未认证', HttpStatus.UNAUTHORIZED);
  //     }
  //     // token校验
  //     if (/Bearer/.test(token)) {
  //       // 不需要 Bearer，否则验证失败
  //       token = token.split(' ').pop();
  //     }
  //     const tokenUser = this.jwtService.decode(token) as any;
  //     const id = tokenUser.id;

  //     if (!id) {
  //       throw new HttpException('未认证', HttpStatus.UNAUTHORIZED);
  //     }

  //     const exist = await this.userService.findById(id);
  //     // if (exist.id !== user.id && exist.role !== 'admin') {
  //     //   throw new HttpException('无权处理', HttpStatus.FORBIDDEN);
  //     // }
  //   }
  @Get('/findById/id')
  @ApiOperation({ summary: 'chaxn' })
  findUseInfoyId(@Query('id') id: string) {
    return this.userService.getUserById(id);
  }
}
