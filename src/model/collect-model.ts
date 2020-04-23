import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CollectModel {
  @ApiProperty({ name: 'userId' })
  @IsNotEmpty({ message: '不能为空' })
  userId: string;

  @ApiProperty({ name: 'targetId' })
  @IsNotEmpty({ message: '不能为空' })
  targetId: string;

  cTime!: number;

}
