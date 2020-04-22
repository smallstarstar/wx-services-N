import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class PlatFormModel {
  @ApiProperty({ name: 'name' })
  @IsNotEmpty({ message: '不能为空' })
  name: string;

  @ApiProperty({ name: 'title' })
  @IsNotEmpty({ message: '不能为空' })
  title: string;
}
