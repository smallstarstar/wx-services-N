/*
 * @Author: shichaoxin
 * @Date: 2020-04-22 17:01:35
 * @Last Modified by: shichaoxin
 * @Last Modified time: 2020-05-02 21:13:48
 */

import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { CollectEntity } from './collect.entity';
@Entity('goods')
export class GoodsEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('int')
  typeId: number;

  @Column('varchar')
  goodsName: string;

  @Column('longtext')
  goodsImg: string;

  @Column('double')
  price: number;

  @Column('double')
  prePrice: number;

  @Column('int')
  curCount: number;

  @Column('int')
  saleCount: number;

  @Column('int')
  saleState: number;

  @Column('longtext')
  cTime: number;

  @Column('boolean')
  advise: boolean;
}
