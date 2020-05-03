import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from 'src/entities/category.entity';
import { CategoryController } from './category.controller';
import { GoodsEntity } from 'src/entities/goods.entity';
import { CollectEntity } from 'src/entities/collect.entity';

@Module({
  providers: [CategoryService],
  imports: [
    TypeOrmModule.forFeature([CategoryEntity, GoodsEntity, CollectEntity]),
  ],
  controllers: [CategoryController],
  exports: [CategoryService],
})
export class CategoryModule { }
