// 表结构
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, } from 'typeorm';

@Entity({name: 'u_name'})
export class UserEntity {

  // 唯一id
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  password: string;
 }
