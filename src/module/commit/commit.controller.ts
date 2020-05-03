import { Controller, Post, Body, Get, Param, Query, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CommitService } from './commit.service';
import { CommitModel } from 'src/model/commit-model';
import { CollectModel } from 'src/model/collect-model';

@Controller()
@ApiTags('评论&收藏类接口')
export class CommitController {
  constructor(
    private readonly commitService: CommitService,
  ) { }
  @Post('/savecommit')
  @ApiOperation({ summary: '保存评论信息' })
  saveCommitInfo(@Body() commitInfo: CommitModel) {
    return this.commitService.save(commitInfo);
  }
  @Get('/getCommit/:id/:page/:size')
  @ApiOperation({ summary: '根据商品的id分页获取评论信息' })
  getCommitInfoByGoodsAndPageAble(@Param('id') id: string, @Query('page') page: number, @Query('size') size: number) {
    return this.commitService.findByIdAndPageAble(id, page, size);
  }
  @Get('/getCommitByUseId/:userId/:page/:size')
  @ApiOperation({ summary: '根据用户的id分页获取用户评论信息' })
  getCommitInfoByUserIdAndPageAble(@Param('userId') userId: string, @Query('page') page: number, @Query('size') size: number) {
    return this.commitService.fingByUserIdAndPageAble(userId, page, size);
  }
  @Post('/saveCollect')
  @ApiOperation({ summary: '保存收藏' })
  saveCollect(@Body() collectModel: CollectModel) {
    return this.commitService.saveCollect(collectModel);
  }
  @Delete('/cancel')
  @ApiOperation({ summary: '取消收藏' })
  cancelCollect(@Query('id') id: string) {
    return this.commitService.cancelCollect(id);
  }
  @Get('/getCollectList/:userId')
  @ApiOperation({ summary: '根据用户获取用户收藏列表' })
  getCollectList(@Param('userId') userId: string) {
    return this.commitService.getCollectInfoByUserId(userId);
  }
}
