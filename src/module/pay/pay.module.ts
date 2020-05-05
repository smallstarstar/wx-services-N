import { Module, HttpModule } from '@nestjs/common';
import { PayController } from './pay.controller';
import { PayService } from './pay.service';

@Module({
  imports: [HttpModule],
  controllers: [PayController],
  providers: [PayService],
  exports: [PayService],
})
export class PayModule {}
