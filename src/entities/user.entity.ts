// 表结构
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, ManyToOne, RelationId } from 'typeorm';
import { PlatEntity } from './plat.entity';

@Entity({ name: 'u_name' })
export class UserEntity extends BaseEntity {

  // 唯一id
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  username: string;

  @Column('varchar')
  password: string;

  @Column('int')
  roleId: number;

  @Column('varchar')
  phone: string;

  // 关联性数据--->返回的entity中包含这个字段
  @ManyToOne(type => PlatEntity, plat => plat.users, {
    onDelete: 'NO ACTION',
  })
  plat: PlatEntity;

  // 关联性id
  @RelationId((user: UserEntity) => user.plat)
  platId: string;
  role: string;
}
