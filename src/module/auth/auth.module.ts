import { Module, HttpModule } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt-strategy';

const passModule = PassportModule.register({ defaultStrategy: 'jwt' });
const jwtModule = JwtModule.register({
  secret: 'jwt',
  signOptions: { expiresIn: '3600s' },
});

@Module({
  imports: [UserModule, passModule, jwtModule, HttpModule],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [passModule, jwtModule],
})
export class AuthModule {}
