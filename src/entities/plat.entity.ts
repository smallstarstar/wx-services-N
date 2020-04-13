import { BaseEntity, PrimaryGeneratedColumn, Entity, Column, OneToMany } from "typeorm";
import { UserEntity } from './user.entity';


@Entity({name: 'plat'})
export class PlatEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  name: string;

  @Column({
    type: 'varchar',
    length: 50,
    default: '123',
  })
  title: string;

  @OneToMany( type => UserEntity, user => user.plat) // type指定User， 第二個参数是function预设传入第一个参数的type，这边需要设定inverse屬性，user entity里的dep屬性，这个属性不会存到数据库
  users: [];
}