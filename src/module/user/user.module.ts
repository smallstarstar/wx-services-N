import { Module, forwardRef } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { PlatformModule } from '../platform/platform.module';
import { AuthModule } from '../auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
const passModule = PassportModule.register({ defaultStrategy: 'jwt' });
const jwtModule = JwtModule.register({
  secret: 'services',
  signOptions: { expiresIn: '7d' },
});
@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]), PlatformModule, jwtModule, passModule,
  ],
  exports: [UserService, passModule, jwtModule],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule { }
