import { Controller, Post, Get } from '@nestjs/common';
import { PayService } from './pay.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@Controller()
@ApiTags('订单支付类接口')
export class PayController {
  constructor(
    private readonly payService: PayService,
  ) {}
  @Get('/saveCategory')
  @ApiOperation({ summary: '用户下单' })
  order() {
    return this.payService.order();
  }
}
