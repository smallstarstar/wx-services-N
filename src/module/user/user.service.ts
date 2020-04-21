/*
 * @Author: shichaoxin 
 * @Date: 2020-04-15 10:21:48 
 * @Last Modified by: shichaoxin
 * @Last Modified time: 2020-04-15 10:37:40
 */

import { Injectable, Get, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../entities/user.entity';
import { Repository } from 'typeorm';
import { UserModel } from '../../model/user-model';
import { PlatformService } from '../platform/platform.service';
import { PageBean } from 'src/utils/page-bean';

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
    userInfo.plat = await this.platformService.findById();
    // 查询是否已经存在
    let phone = userInfo.phone;
    let user = await this.userRepository.findOne(phone);
    if (user) {
      throw new HttpException('用户已经存在', HttpStatus.BAD_REQUEST);
    }
    await this.userRepository.save(userInfo);
  }

  /**
   * 格局id查询指定的用户
   * @param id 
   */
  async findById(id): Promise<UserEntity> {
    return this.userRepository.findOne(id);
  }

  async getUserById(id): Promise<UserEntity> {
    // return await this.userRepository.findOne(id, { relations: ['plat'] });
    // relations指定载入关联属性，是阵列，可能有多个导览属性
    // return await this.userRepo.findOneOrFail(id); // 以id搜寻，没找到会丢出例外
    return await this.userRepository
      .createQueryBuilder()
      .where("UserEntity.id = :id", { id })
      .getOne();
  }

  /**
   * 获取全部用户信息
   */
  async findAll(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  /**
   *  分页获取用户信息
   * @param page 
   * @param size 
   */
  async pageAble(page: number, size: number): Promise<PageBean> {
    let pageBean = new PageBean();
    let skip = (page - 1) * size;
    pageBean.list = await this.userRepository.createQueryBuilder().skip(skip).take(size).getMany();
    pageBean.total = await this.userRepository.count();
    return pageBean;
  }

  /**
   * 用户登录
   * @param username 
   * @param password 
   */
  async findByUserNameAndPassword(username: string, password: string) {
    return this.userRepository.findOne({ username, password });
  }

  /**
   * 删除用户信息
   * @param id 
   */
  async deleteUserInfo(id: string): Promise<Boolean> {
    let user = await this.userRepository.findOne(id);
    if (user) {
      await this.userRepository.delete(id);
      return true
    } else {
      throw new HttpException('参数错误', HttpStatus.BAD_REQUEST)
    }
  }
  /**
   * 更新用户信息
   * @param id 
   * @param user 
   */
  async update(id: string, user: UserModel) {
    let userInfo = await this.userRepository.findOne(id);
    if (!userInfo) {
      throw new HttpException('参数错误', HttpStatus.BAD_REQUEST);

    }
    let newUser = this.userRepository.merge(userInfo, user);
    return this.userRepository.save(newUser);
  }
}