import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommitEntity } from 'src/entities/commit.entity';
import { CommitModel } from 'src/model/commit-model';

@Injectable()
export class CommitService {
  constructor(
    @InjectRepository(CommitEntity)
    private readonly commitRepository: Repository<CommitEntity>,
  ) { }
  async save(commitModel: CommitModel) {
    commitModel.cTime = new Date().getTime();
    return await this.commitRepository.save(commitModel);
  }
}
