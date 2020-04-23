import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlatEntity } from 'src/entities/plat.entity';
import { PlatformService } from './platform.service';
import { PlatformController } from './platform.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([PlatEntity]),
  ],
  exports: [PlatformService],
  providers: [PlatformService],
  controllers: [PlatformController],

})
export class PlatformModule {}
