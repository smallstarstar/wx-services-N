import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from 'src/entities/category.entity';
import { Repository } from 'typeorm';
import { CategoryModel } from 'src/model/category-model';
import { GoodsEntity } from 'src/entities/goods.entity';
import { GoodsModel } from 'src/model/goods-model';
import { PageBean } from 'src/utils/page-bean';
import { SaleStatus } from 'src/common/enum/sale-status';
import ErrorInfoMessage from '../../common/event-key/error-info.message';
import { CollectEntity } from 'src/entities/collect.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
    @InjectRepository(GoodsEntity)
    private readonly goodsRepository: Repository<GoodsEntity>,
    @InjectRepository(CollectEntity)
    private readonly collectRepository: Repository<CollectEntity>,
  ) { }
  /**
   * 保存种类信息
   * @param categoryModel
   */
  async save(categoryModel: CategoryModel): Promise<boolean> {
    const data = await this.categoryRepository.findOne({ typeId: categoryModel.typeId });
    const categoryName = await this.categoryRepository.findOne({ typeName: categoryModel.typeName });
    if (categoryName) {
      throw new HttpException(ErrorInfoMessage.HAS_ALEARLY_EXIST, HttpStatus.BAD_REQUEST);
    }
    if (!categoryModel.typeName || data) {
      throw new HttpException(ErrorInfoMessage.PARAMS_ERROR, HttpStatus.BAD_REQUEST);
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
      throw new HttpException(ErrorInfoMessage.HAS_ALEARLY_EXIST, HttpStatus.BAD_REQUEST);
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
      throw new HttpException(ErrorInfoMessage.HAS_ALEARLY_EXIST, HttpStatus.BAD_REQUEST);
    }
    if (goodsModel.typeId === null || goodsModel.typeId === undefined) {
      throw new HttpException(ErrorInfoMessage.PARAMS_ERROR, HttpStatus.BAD_REQUEST);
    }
    goodsModel.cTime = new Date().getTime();
    goodsModel.saleState = SaleStatus.onSale;
    return await this.goodsRepository.save(goodsModel);
  }
  /**
   * 分页获取全部信息
   * @param page
   * @param size
   */
  async findGoodsByPageable(page: number, size: number) {
    const pageBean = new PageBean();
    const limit = +size;
    const skip = (+page - 1) * limit;
    pageBean.list = await this.goodsRepository.createQueryBuilder()
      .leftJoinAndMapOne('GoodsEntity.typeId', CategoryEntity, 'CategoryEntity', 'GoodsEntity.typeId = CategoryEntity.typeId ')
      .where('GoodsEntity.advise = true')
      .orderBy('GoodsEntity.cTime', 'ASC').skip(+skip).take(limit).getMany();
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
  /**
   * 根据Id对商品进行上架或下架
   * @param id
   */
  async updateSale(id: string) {
    const data = await this.goodsRepository.findOne({ id });
    if (data.saleState === SaleStatus.onSale) {
      await this.goodsRepository.update(id, { saleState: SaleStatus.upSale });
    } else {
      await this.goodsRepository.update(id, { saleState: SaleStatus.onSale });
    }
    return true;
  }
  /**
   * 根据id查询商品的信息
   * @param id
   */
  async findOneById(id: string, userId: string) {
    if (!id) {
      throw new HttpException(ErrorInfoMessage.PARAMS_ERROR, HttpStatus.BAD_REQUEST);
    }
    const list: any = {};
    list.obj = await this.goodsRepository.findOne({ id });
    const data = await this.collectRepository.createQueryBuilder('collect')
      .where('collect.targetId = :targetId', { targetId: id })
      .andWhere('collect.userId = :userId', { userId }).getOne();
    if (data) {
      list.collect = true;
      list.id = data.id;
    } else {
      list.collect = false;
    }
    return list;
  }
  /**
   * 根据商品的名称进行模糊查询
   * @param name
   */
  async findListByKeyWord(name: string) {
    if (!name) {
      throw new HttpException(ErrorInfoMessage.PARAMS_NOT_FOUND, HttpStatus.BAD_REQUEST);
    }
    return this.goodsRepository.createQueryBuilder().where('GoodsEntity.goodsName LIKE :param', {})
      .setParameters({
        param: '%' + name + '%',
      })
      .orderBy('GoodsEntity.id', 'ASC').getMany();
  }
}
