import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PlatEntity } from 'src/entities/plat.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PlatformService {
  constructor(
    @InjectRepository(PlatEntity)
    private readonly platRepository: Repository<PlatEntity>
  ) {}

  async savePlat(platFormModel: Partial<PlatEntity>) {
      return await this.platRepository.save(platFormModel);
  }

  async findById() {
    return await this.platRepository.findOneOrFail('e2d76e33-98b3-4683-ae00-caea6c71dd15')
  }
}
