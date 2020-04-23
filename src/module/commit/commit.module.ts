import { Module } from '@nestjs/common';
import { CommitService } from './commit.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommitEntity } from 'src/entities/commit.entity';
import { CommitController } from './commit.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommitEntity]),
  ],
  providers: [CommitService],
  controllers: [CommitController],
  exports: [CommitService],
})
export class CommitModule {}
