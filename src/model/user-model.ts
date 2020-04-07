import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class UserModel {
  @ApiProperty({ name: 'username' })
  @IsNotEmpty({ message: '不能为空' })
  username: string;

  @ApiProperty({ name: 'password' })
  @IsNotEmpty({ message: '不能为空' })
  password: string;



}