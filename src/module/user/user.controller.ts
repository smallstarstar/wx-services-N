import { Controller, Post, Get, Body, HttpStatus, HttpCode, HttpException, Request, Query, Param, Delete, Put, Inject } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserModel } from '../../model/user-model';
import { JwtService } from '@nestjs/jwt';


@Controller()
@ApiTags('用户类接口')
export class UserController {
  constructor(
  private readonly userService: UserService,
  // @Inject('JwtService')  private readonly jwtService: JwtService
  ) { }


  @Post('/registor')
  @ApiOperation({ summary: '用户注册' })
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

  //     // const exist = await this.userService.findById(id);
  //     // if (exist.id !== user.id && exist.role !== 'admin') {
  //     //   throw new HttpException('无权处理', HttpStatus.FORBIDDEN);
  //     // }
  //   }
  @Get('/findById/:id')
  @ApiOperation({ summary: '根据id查询用户信息' })
  @HttpCode(HttpStatus.CREATED)
  findUseInfoyId(@Query('id') id: string) {
    return this.userService.getUserById(id);
  }

  @Delete('/findById/:id')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: '根据id删除用户信息' })
  deleteUserInfoById(@Query('id') id: string) {
    return this.userService.deleteUserInfo(id);
  }


  @Get('/userInfo')
  @ApiOperation({ summary: '获取全部用户信息' })
  getUserInfoList() {
    return this.userService.findAll();
  }

  @Get('/userInfo/:page/:size')
  @ApiOperation({ summary: '分页获取用户信息' })
  getUserInfoByPageInfo(@Query('page') page: number, @Query('size') size: number) {
    return this.userService.pageAble(page, size);
  }

  @Get('/login/:username/:password')
  @ApiOperation({ summary: '用户登录' })
  login(@Query('username') username: string, @Query('password') password: string) {
    return this.userService.findByUserNameAndPassword(username, password);
  }

  @Put('/upDat/:id')
  @ApiOperation({ summary: '更新用户信息' })
  upDateUserInfo(@Query('id') id: string, @Body() user: UserModel) {
    return this.userService.update(id, user);
  }

}
