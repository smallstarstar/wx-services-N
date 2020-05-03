import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommitEntity } from 'src/entities/commit.entity';
import { CommitModel } from 'src/model/commit-model';
import { PageBean } from 'src/utils/page-bean';
import { CollectEntity } from 'src/entities/collect.entity';
import { CollectModel } from 'src/model/collect-model';
import ErrorInfoMessage from 'src/common/event-key/error-info.message';
import { GoodsEntity } from 'src/entities/goods.entity';

@Injectable()
export class CommitService {
  constructor(
    @InjectRepository(CommitEntity)
    private readonly commitRepository: Repository<CommitEntity>,
    @InjectRepository(CollectEntity)
    private readonly collectRepository: Repository<CollectEntity>,
  ) { }
  /**
   * 保存评论信息
   * @param commitModel
   */
  async save(commitModel: CommitModel) {
    commitModel.cTime = new Date().getTime();
    return await this.commitRepository.save(commitModel);
  }
  /**
   * 根据商品的id分页获取评论信息
   * @param id
   * @param page
   * @param size
   */
  async findByIdAndPageAble(id: string, page: number, size: number) {
    const pageBean = new PageBean();
    const skip = (page - 1) * size;
    pageBean.total = await this.commitRepository.createQueryBuilder().where('CommitEntity.targetId = :targetId', { targetId: id }).getCount();
    pageBean.list = await this.commitRepository.createQueryBuilder().orderBy('CommitEntity.cTime', 'ASC')
      .where('CommitEntity.targetId = :targetId', { targetId: id }).skip(skip).take(size).getMany();
    return pageBean;
  }
  /**
   * 根据用户的id分页获取用户评论信息
   * @param userId
   * @param page
   * @param size
   */
  async fingByUserIdAndPageAble(userId: string, page: number, size: number) {
    const pageBean = new PageBean();
    const skip = (page - 1) * size;
    pageBean.total = await this.commitRepository.createQueryBuilder().where('CommitEntity.userId = :userId', { userId }).getCount();
    pageBean.list = await this.commitRepository.createQueryBuilder().orderBy('CommitEntity.cTime', 'ASC')
      .where('CommitEntity.userId = :userId', { userId }).skip(skip).take(size).getMany();
    return pageBean;
  }
  /**
   * 保存收藏
   * @param collectModel
   */
  async saveCollect(collectModel: CollectModel) {
    collectModel.cTime = new Date().getTime();
    return await this.collectRepository.save(collectModel);
  }
  /**
   * 取消收藏
   * @param id
   */
  async cancelCollect(id: string) {
    const data = await this.collectRepository.findOne({ id });
    if (data) {
      await this.collectRepository.delete(id);
      return true;
    } else {
      throw new HttpException(ErrorInfoMessage.PARAMS_ERROR, HttpStatus.BAD_REQUEST);
    }
  }
  /**
   * 根据用户的id获取用户收藏信息
   * @param id
   */
  async getCollectInfoByUserId(userId: string) {
    if (!userId) {
      throw new HttpException(ErrorInfoMessage.PARAMS_NOT_FOUND, HttpStatus.BAD_REQUEST);
    }
    // 关联查询
    return await this.collectRepository.createQueryBuilder('collect')
      .leftJoinAndMapOne('collect.targetId', GoodsEntity, 'goods', 'collect.targetId = goods.id')
      .where('collect.userId = :userId', {userId})
      .getMany();
  }

}
