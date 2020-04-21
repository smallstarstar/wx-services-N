import { Module } from '@nestjs/common';
import { UserModule } from './module/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlatformModule } from './module/platform/platform.module';
import { AuthModule } from './module/auth/auth.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'store',
      charset: 'utf8mb4',
      timezone: "UTC",
      multipleStatements: true,
      dropSchema: false,
      // sql将entity字段同步到数据库中
      synchronize: true,
      logging: true,
      // 引入所有的实体
      entities: [__dirname + '/**/*.entity{.ts,.js}']
    }),
    UserModule,
    PlatformModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
