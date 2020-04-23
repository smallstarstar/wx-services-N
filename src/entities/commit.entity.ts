/*
 * @Author: shichaoxin
 * @Date: 2020-04-23 17:29:46
 * @Last Modified by: shichaoxin
 * @Last Modified time: 2020-04-23 17:51:14
 */

import { BaseEntity, PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity('commit')
export class CommitEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  userId: string;

  @Column('longtext')
  detail: string;

  @Column('int')
  rank: number;

  @Column('longtext')
  cTime: number;

  @Column('longtext')
  userImg: string;
}
