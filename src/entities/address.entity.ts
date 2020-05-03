/*
 * @Author: shichaoxin;
 * @Date: 2020-04-22 10:09:00;
 * @Last Modified by: shichaoxin
 * @Last Modified time: 2020-04-22 14:30:43
 */

import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity('u_address')
export class AddressEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  userId: string;

  @Column('varchar')
  username: string;

  @Column('int')
  isdefault: boolean;

  @Column('varchar')
  remark: string;

  @Column('varchar')
  phone: string;

  @Column('varchar')
  provice: string;

  @Column('varchar')
  city: string;

  @Column('varchar')
  detail: string;

  @Column('longtext')
  cTime: number;
}
