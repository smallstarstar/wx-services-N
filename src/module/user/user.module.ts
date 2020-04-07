import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user';


@Module({
  imports:[
    TypeOrmModule.forFeature([UserEntity])
  ],
  exports: [UserService],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
