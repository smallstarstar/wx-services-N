/*
 * @Author: shichaoxin
 * @Date: 2020-04-22 17:09:42
 * @Last Modified by: shichaoxin
 * @Last Modified time: 2020-05-02 21:14:10
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class GoodsModel {
  @ApiProperty({ name: 'typeId' })
  @IsNotEmpty({ message: '不能为空' })
  typeId: number;

  @ApiProperty({ name: 'goodsName' })
  @IsNotEmpty({ message: '不能为空' })
  goodsName: string;

  @ApiProperty({ name: 'price' })
  @IsNotEmpty({ message: '不能为空' })
  price: number;

  @ApiProperty({ name: 'prePrice' })
  @IsNotEmpty({ message: '不能为空' })
  prePrice: number;

  @ApiProperty({ name: 'curCount' })
  @IsNotEmpty({ message: '不能为空' })
  curCount: number;

  @ApiProperty({ name: 'goodsImg' })
  @IsNotEmpty({ message: '不能为空' })
  goodsImg: string;

  @ApiProperty({ name: 'advise' })
  @IsNotEmpty({ message: '不能为空' })
  advise: boolean;

  @ApiProperty({ name: 'saleCount' })
  @IsNotEmpty({ message: '不能为空' })
  saleCount: number;
  saleState!: number;
  cTime!: number;
}
