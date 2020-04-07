import { Module } from '@nestjs/common';
import { UserModule } from './module/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './config/ormconnect';
import { UserEntity } from './entities/user';


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
      synchronize: true,
      logging: true,
      entities: [
        UserEntity
      ]
    }),
    UserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
