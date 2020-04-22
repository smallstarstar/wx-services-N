/*
 * @Author: shichaoxin
 * @Date: 2020-04-22 14:44:00
 * @Last Modified by: shichaoxin
 * @Last Modified time: 2020-04-22 15:49:01
 */

import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressEntity } from 'src/entities/address.entity';
import { Repository } from 'typeorm';
import { AddressModel } from 'src/model/address-model';
import { AddressModule } from './address.module';
import { PageBean } from 'src/utils/page-bean';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(AddressEntity)
    private readonly addressReposity: Repository<AddressEntity>,
  ) { }
  /**
   * 保存用户填写的地址
   * @param addressModel
   */
  async saveAddress(addressModel: AddressModel) {
    if (!addressModel.userId || !addressModel.phone || addressModel.phone.length !== 11) {
      throw new HttpException('参数错误', HttpStatus.BAD_REQUEST);
    }
    addressModel.cTime = new Date().getTime();
    return await this.addressReposity.save(addressModel);
  }
  /**
   * 根据用户的id获取用户已经填写的地址
   * @param userId
   */
  async findAllById(userId: string) {
    if (!userId) {
      throw new HttpException('参数错误', HttpStatus.BAD_REQUEST);
    }
    return await this.addressReposity.createQueryBuilder().where('AddressEntity.userId = :userId', { userId }).getMany();
  }
  /**
   * 分页获取所有用户的地址
   * @param page
   * @param size
   */
  async addressPageable(page: number, size: number): Promise<PageBean> {
    const pageBean = new PageBean();
    const limit = size;
    const skip = (page - 1) * limit;
    pageBean.list = await this.addressReposity.createQueryBuilder().orderBy('AddressEntity.cTime', 'ASC').skip(skip).take(limit).getMany();
    pageBean.total = await this.addressReposity.count();
    return pageBean;
  }
  /**
   * 根据ids删除用户的地址
   * @param ids
   */
  async deleteMany(ids: []) {
    if (ids.length === 0) {
      throw new HttpException('参数错误', HttpStatus.BAD_REQUEST);
    }
    const data = await this.addressReposity.findByIds(ids);
    if (data.length === 0) {
      return false;
    }
    await this.addressReposity.delete(ids);
    return true;
  }
  /**
   * 更新用户地址信息
   * @param id
   * @param addressModel
   */
  async update(id, addressModel: AddressModel): Promise<boolean> {
    if (!id || addressModel.phone.length !== 11 || !addressModel.provice || !addressModel.city || !addressModel.detail) {
      throw new HttpException('参数错误', HttpStatus.BAD_REQUEST);
    }
    await this.addressReposity.update(id, addressModel);
    return true;
  }
}
