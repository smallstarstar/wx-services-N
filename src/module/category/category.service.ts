import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from 'src/entities/category.entity';
import { Repository } from 'typeorm';
import { CategoryModel } from 'src/model/category-model';
import { GoodsEntity } from 'src/entities/goods.entity';
import { GoodsModel } from 'src/model/goods-model';
import { PageBean } from 'src/utils/page-bean';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
    @InjectRepository(GoodsEntity)
    private readonly goodsRepository: Repository<GoodsEntity>,
  ) { }
  /**
   * 保存种类信息
   * @param categoryModel
   */
  async save(categoryModel: CategoryModel): Promise<boolean> {
    const data = await this.categoryRepository.findOne({ typeId: categoryModel.typeId });
    const categoryName = await this.categoryRepository.findOne({ typeName: categoryModel.typeName });
    if (categoryName) {
      throw new HttpException('已经存在', HttpStatus.BAD_REQUEST);
    }
    if (!categoryModel.typeName || data) {
      throw new HttpException('参数错误', HttpStatus.BAD_REQUEST);
    }
    categoryModel.cTime = new Date().getTime();
    await this.categoryRepository.save(categoryModel);
    return true;
  }
  /**
   * 获取全部种类信息
   */
  async findAll() {
    const [list, total] = await this.categoryRepository.findAndCount();
    return { list, total };
  }
  /**
   * 根据id更新种类名称
   * @param id
   * @param params
   */
  async update(id: string, params: string): Promise<boolean> {
    const categoryName = await this.categoryRepository.findOne({ typeName: params });
    if (categoryName) {
      throw new HttpException('已经存在', HttpStatus.BAD_REQUEST);
    }
    await this.categoryRepository.update(id, { typeName: params });
    return true;
  }
  /**
   * 保存商品信息
   * @param goodsModel
   */
  async saveGoods(goodsModel: GoodsModel) {
    const data = await this.goodsRepository.findOne({ goodsName: goodsModel.goodsName });
    if (data) {
      throw new HttpException('已经存在', HttpStatus.BAD_REQUEST);
    }
    if (!goodsModel.typeId) {
      throw new HttpException('参数错误', HttpStatus.BAD_REQUEST);
    }
    goodsModel.cTime = new Date().getTime();
    return await this.goodsRepository.save(goodsModel);
  }
  /**
   * 分页获取全部信息
   * @param page
   * @param size
   */
  async findGoodsByPageable(page: number, size: number) {
    const pageBean = new PageBean();
    const limit = size;
    const skip = (page - 1) * limit;
    pageBean.list = await this.goodsRepository.createQueryBuilder().orderBy('GoodsEntity.cTime', 'ASC').skip(skip).take(limit).getMany();
    pageBean.total = await this.goodsRepository.count();
    return pageBean;
  }
  /**
   * 根据typeId获取种类信息
   * @param typeId
   * @param page
   * @param size
   */
  async findGoodsByIdAndPagebale(typeId: string, page: number, size: number) {
    const pageBean = new PageBean();
    const limit = size;
    const skip = (page - 1) * limit;
    pageBean.list = await this.goodsRepository.createQueryBuilder().
      orderBy('GoodsEntity.cTime', 'ASC').where('GoodsEntity.typeId = :typeId', { typeId }).skip(skip).take(limit).getMany();
    pageBean.total = await this.goodsRepository.createQueryBuilder().where('GoodsEntity.typeId = :typeId', { typeId }).getCount();
    return pageBean;
  }
}
