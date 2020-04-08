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