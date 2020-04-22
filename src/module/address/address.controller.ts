import { Controller, Post, HttpCode, HttpStatus, Body, Get, Query, Param, Delete, Put } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AddressService } from './address.service';
import { AddressModel } from 'src/model/address-model';

@Controller()
@ApiTags('用户地址类接口')
export class AddressController {
  constructor(private readonly addressService: AddressService) { }
  @Post('/saveAddress')
  @ApiOperation({ summary: '保存用户信息地址' })
  @HttpCode(HttpStatus.CREATED)
  saveUserAddress(@Body() addressModel: AddressModel) {
    return this.addressService.saveAddress(addressModel);
  }
  @Get('/userAddress/:userId')
  @ApiOperation({ summary: '根据用户的id获取用户已经填写的地址' })
  getUserAddressByUserId(@Query('userId') userId: string) {
    return this.addressService.findAllById(userId);
  }
  @Get('/userAddress/:page/:size')
  @ApiOperation({ summary: '分页获取所有用户的地址' })
  getPabeAbleByPageAndSize(@Param('page') page: number, @Param('size') size: number) {
    return this.addressService.addressPageable(page, size);
  }
  @Delete('/deteleByIds')
  @ApiOperation({ summary: '批量删除一个或多个用户地址' })
  deleteUserAddress(@Body() ids: []) {
    return this.addressService.deleteMany(ids);
  }
  @Put('/updateaddress/:id')
  @ApiOperation({ summary: '更新用户地址信息' })
  updateAddressInfo(@Param('id') id: string, @Body() addressModle: AddressModel) {
    return this.addressService.update(id, addressModle);
  }
}
