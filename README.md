### nest + mysql

#### 数据库基本操作

typeorm主要的方法

 + save
 + remove
 + insert
 + update // (id, data)
 + delete // 只需要传入id
 + count
 + find // find 沒传入参数代表获取全部资料
 + findAndCount
 + findByIds
 + findOne  // // 以id搜寻，沒找到return null
 + findOneOrFail // 以id搜寻，沒找到会丟出例外
 + query
 + increment
 + decrement

 #### 使用sql语句进行查询
 ```javascript
 // 查询全部数据
使用`createQueryBuilder`
async findAll(): Promise<CatEntity[]> {
  return await this.catRepository
    .createQueryBuilder('cat') // 查询表名
    .offset(1) // 从多少条开始
    .limit(2) // 查询2条数据
    .orderBy('age', 'DESC') // 排序
    .getMany(); // 返回多条数据
}
// 使用query
async findAll(): Promise<CatEntity[]> {
  return await this.catRepository.query('select * from cat');
}
 ```

#### jpa

```js
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOne({
      where:{
      id
     }
  });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
```

#### queryBuidler

```javascript
// 获取单个数据
1.this.userRepository
	  .createQueryBuilder()
      .select('user')
      .from(User，'user')
      .where("user.id = :id", { id: 1 })
	  .getOne()
// 简写
this.userRepository.createQueryBuilder('表名 user').where('user.ud = :id',{id:1}).getOne()
2.获取全部数据
要从数据库中获取多个结果，例如，要从数据库中获取所有用户，请使用getMany：
const users = await getRepository(User)
    .createQueryBuilder("user")
    .getMany();
// 简写
this.userRepository.createQueryBuilder('表名 user').where('user.ud = :id',{id:1}).getMany()
3.逻辑与查询
createQueryBuilder("user")
    .where("user.firstName = :firstName", { firstName: "Timber" })
    .andWhere("user.lastName = :lastName", { lastName: "Saw" });
4.逻辑或查询
createQueryBuilder("user")
    .where("user.firstName = :firstName", { firstName: "Timber" })
    .orWhere("user.lastName = :lastName", { lastName: "Saw" });
5.排序
createQueryBuilder("user")
    .orderBy("user.id", "DESC")

createQueryBuilder("user")
    .orderBy("user.id", "ASC")

createQueryBuilder("user")
    .orderBy("user.name")
    .addOrderBy("user.id");
6，分页
const users = await getRepository(User)
    .createQueryBuilder("user")
    .leftJoinAndSelect("user.photos", "photo")
    .skip(5)
    .take(10)
    .getMany();
```

