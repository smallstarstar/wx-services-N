import { Module } from '@nestjs/common';
import { CommitService } from './commit.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommitEntity } from 'src/entities/commit.entity';
import { CommitController } from './commit.controller';
import { CollectEntity } from 'src/entities/collect.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommitEntity, CollectEntity]),
  ],
  providers: [CommitService],
  controllers: [CommitController],
  exports: [CommitService],
})
export class CommitModule {}
