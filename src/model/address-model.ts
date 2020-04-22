import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class AddressModel {
  @ApiProperty({ name: 'userId' })
  @IsNotEmpty({ message: '不能为空' })
  userId: string;

  @ApiProperty({ name: 'phone' })
  @Length(11)
  @IsNotEmpty({ message: '不能为空' })
  phone: string;

  @ApiProperty({ name: 'provice' })
  @IsNotEmpty({ message: '不能为空' })
  provice: string;

  @ApiProperty({ name: 'city' })
  @IsNotEmpty({ message: '不能为空' })
  city: string;

  @ApiProperty({ name: 'detail' })
  @IsNotEmpty({ message: '不能为空' })
  detail: string;

  cTime!: number;
}