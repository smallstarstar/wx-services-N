import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CommitService } from './commit.service';
import { CommitModel } from 'src/model/commit-model';

@Controller()
@ApiTags('评论类接口')
export class CommitController {
  constructor(
    private readonly commitService: CommitService,
  ) { }
  @Post('/savecommit')
  @ApiOperation({ summary: '保存评论信息' })
  saveCommitInfo(@Body() commitInfo: CommitModel) {
    return this.commitService.save(commitInfo);
  }
}
