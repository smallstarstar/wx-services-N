import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CommitModel {
  @ApiProperty({ name: 'userId' })
  @IsNotEmpty({ message: '不能为空' })
  userId: string;

  @ApiProperty({ name: 'detail' })
  @IsNotEmpty({ message: '不能为空' })
  detail: string;

  @ApiProperty({ name: 'userImg' })
  @IsNotEmpty({ message: '不能为空' })
  userImg: string;

  @ApiProperty({ name: 'targetId' })
  @IsNotEmpty({ message: '不能为空' })
  targetId: string;

  @ApiProperty({ name: 'rank' })
  @IsNotEmpty({ message: '不能为空' })
  rank: number;

  cTime!: number;
}
