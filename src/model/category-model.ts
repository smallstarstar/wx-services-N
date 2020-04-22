import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CategoryModel {
  @ApiProperty({ name: 'typeName' })
  @IsNotEmpty({ message: '不能为空' })
  typeName: string;

  @ApiProperty({ name: 'typeId' })
  @IsNotEmpty({ message: '不能为空' })
  typeId: number;

  cTime!: number;
}
