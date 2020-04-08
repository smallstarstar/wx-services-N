import { Injectable, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../entities/user.entity';
import { Repository } from 'typeorm';
import { UserModel } from '../../model/user-model';
import { PlatformService } from '../platform/platform.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    private platformService: PlatformService
  ) { }

  /**
   * 保存用户信息
   * @param userInfo 
   */
  async createdUser(userInfo: UserModel) {
    const aa = new UserModel();
    aa.plat = await this.platformService.findById();
    aa.password = '111';
    aa.phone = '1111111',
      aa.username = 'aaaaaa';
    aa.roleId = 0;
    await this.userRepository.save(aa);
  }

  /**
   * 格局id查询指定的用户
   * @param id 
   */
  async findById(id): Promise<UserEntity> {
    return this.userRepository.findOne(id);
  }

  async getUserById(id) {
    // 关联性查询
    return await this.userRepository.findOne(id, { relations: ['plat'] });
    // relations指定载入关联属性，是阵列，可能有多个导览属性
    // return await this.userRepo.findOneOrFail(id); // 以id搜寻，没找到会丢出例外
  }

}
