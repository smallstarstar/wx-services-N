import { BaseEntity, PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

/*
 * @Author: shichaoxin
 * @Date: 2020-04-22 16:16:04
 * @Last Modified by: shichaoxin
 * @Last Modified time: 2020-04-22 16:36:59
 */
@Entity('category')
export class CategoryEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('int')
  typeId: number;

  @Column('varchar')
  typeName: string;

  @Column('longtext')
  cTime: number;
}
