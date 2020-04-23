import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommitEntity } from 'src/entities/commit.entity';
import { CommitModel } from 'src/model/commit-model';
import { PageBean } from 'src/utils/page-bean';
import { CollectEntity } from 'src/entities/collect.entity';
import { CollectModel } from 'src/model/collect-model';

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
  async saveCollect(collectModel: CollectModel) {
    collectModel.cTime = new Date().getTime();
    return await this.collectRepository.save(collectModel);
  }
  async cancelCollect(id: string) {
    await this.collectRepository.delete(id);
    return true;
  }
}
