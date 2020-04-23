/*
 * @Author: shichaoxin
 * @Date: 2020-04-23 17:29:46
 * @Last Modified by: shichaoxin
 * @Last Modified time: 2020-04-23 17:51:14
 */

import { BaseEntity, PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity('collect')
export class CollectEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  userId: string;

  @Column('varchar')
  targetId: string;

  @Column('longtext')
  cTime: number;
}
