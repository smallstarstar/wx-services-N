import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserModel } from '../../model/user-model';


@Controller('/api/v1')
@ApiTags('用户类接口')
export class UserController {
  constructor(
    private userService: UserService
  ) {}
  @Post('/registor')
  userRegistor(@Body() userModel: UserModel) {
    return this.userService.createdUser(userModel);
  }

}
