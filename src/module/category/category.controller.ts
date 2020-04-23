import { Controller, Post, Body, Get, Put, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { CategoryModel } from 'src/model/category-model';
import { GoodsModel } from 'src/model/goods-model';

@Controller()
@ApiTags('种类&类型信息类接口')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
  ) { }
  @Post('/saveCategory')
  @ApiOperation({ summary: '保存种类信息' })
  saveCategoryName(@Body() categoryModel: CategoryModel) {
    return this.categoryService.save(categoryModel);
  }
  @Get('/getCategory')
  @ApiOperation({ summary: '获取全部种类信息' })
  getAll() {
    return this.categoryService.findAll();
  }
  @Put('/update/:id/:typeName')
  @ApiOperation({ summary: '根据id更新种类名称' })
  updateByIds(@Param('id') id: string, @Query('name') typeName: string) {
    return this.categoryService.update(id, typeName);
  }
  @Post('/saveGoods')
  @ApiOperation({ summary: '保存商品信息' })
  saveGoodsInfo(@Body() goodsModel: GoodsModel) {
    return this.categoryService.saveGoods(goodsModel);
  }
  @Get('/getGoods/:page/:size')
  @ApiOperation({ summary: '分页获取全部信息' })
  getGoodsByPageable(@Query('page') page: number, @Query('size') size: number) {
    return this.categoryService.findGoodsByPageable(page, size);
  }
  @Get('/getGoodsById/:typeId/:page/:size')
  @ApiOperation({ summary: '根据Id分页获取信息' })
  getGoodsByIdAndPageable(@Param('typeId') typeId: string, @Query('page') page: number, @Query('size') size: number) {
    return this.categoryService.findGoodsByIdAndPagebale(typeId, page, size);
  }
  @Get('/changeSale/:id')
  @ApiOperation({ summary: '根据Id对商品进行上架或下架' })
  changeSaleStatus(@Param('id') id: string) {
    return this.categoryService.updateSale(id);
  }
}
