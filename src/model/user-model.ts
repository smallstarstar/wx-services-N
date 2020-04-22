import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UserModel {
  @ApiProperty({ name: 'username' })
  @IsNotEmpty({ message: '不能为空' })
  username: string;

  @ApiProperty({ name: 'password' })
  @IsNotEmpty({ message: '不能为空' })
  password: string;

  @ApiProperty({name: 'roleId'})
  @IsNotEmpty({message: '不能为空'})
  roleId: number;

  @ApiProperty({name: 'phone'})
  @IsNotEmpty({message: '不能为空'})
  phone: string;

  @ApiProperty({name: 'platId'})
  @IsNotEmpty({message: '不能为空'})
  platId: string;

  @ApiProperty({name: 'platId'})
  @IsNotEmpty({message: '不能为空'})
  // tslint:disable-next-line:ban-types
  plat: Object;
}
