import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { UserModel } from 'src/model/user-model';
import { UserEntity } from 'src/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService) { }

  // Partial: 不完全包含
  createToken(user: Partial<UserEntity>) {
    // jwt签名
    const accessToken = this.jwtService.sign(user);
    return accessToken;
  }

  async login(username: string, password: string) {
    const data: any = await this.userService.findByUserNameAndPassword(username, password);
    // 创建token
    const token = this.createToken({
      id: data.id,
      username: data.username,
      phone: data.phone,
      password: data.password,
      roleId: data.roleId,
    });
    return Object.assign(data, { token });
  }

  async validateUser(payload: UserEntity): Promise<any> {
    return await this.userService.findById(payload.id);
  }
}
