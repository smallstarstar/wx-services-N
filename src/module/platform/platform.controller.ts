import { Controller, Post, Body, Get, HttpStatus, HttpCode, HttpException, Request } from '@nestjs/common';
import { PlatformService } from './platform.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { PlatFormModel } from 'src/model/plat-model';

@Controller()
@ApiTags('品台类接口')
export class PlatformController {
  constructor(private platformService: PlatformService) {}
  @Post('/savePlat')
  @ApiOperation({ summary: '保存平台信息' })
  @HttpCode(HttpStatus.CREATED)
  savePlatformInfo(@Body() platFormModel: PlatFormModel) {
    return this.platformService.savePlat(platFormModel);
  }
}
