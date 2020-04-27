import {
  Controller, Post, Get, Body, HttpStatus, HttpCode,
  Request, Query, Param, Delete, Put, Headers, UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserModel } from '../../model/user-model';
import CheckToken from 'src/utils/check-token';
@Controller()
@ApiTags('用户类接口')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) { }
  private checkOut: CheckToken;
  @Post('/registor')
  @ApiOperation({ summary: '用户注册' })
  @HttpCode(HttpStatus.CREATED)
  userRegistor(@Request() req, @Body() userModel: UserModel) {
    return this.userService.createdUser(userModel);
  }

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
  getUserInfoList(@Headers('token') token: string) {
    this.checkOut.checkToken(token, '');
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
