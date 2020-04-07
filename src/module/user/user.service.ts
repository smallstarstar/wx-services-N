import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../entities/user';
import { Repository } from 'typeorm';
import { UserModel } from '../../model/user-model';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userImplement: Repository<UserEntity>
  ) { }
  async createdUser(article: Partial<UserEntity>) {
    await this.userImplement.save(article);
  }
}
