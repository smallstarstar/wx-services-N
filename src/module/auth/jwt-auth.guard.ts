import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';
import TokenMessgaInfo from '../../common/event-key/token-info.messags';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    if (request.headers.authorization) {
      const data: any = jwt.decode(request.headers.authorization);
      const time = new Date().getTime();
      if (time > data.exp * 1000) {
        throw new UnauthorizedException(TokenMessgaInfo.TOKEN_OUT_TIME);
      }
      return request;
    } else {
      throw new UnauthorizedException(TokenMessgaInfo.TOKEN_NOT_FOUND);
    }
  }

  // handleRequest(err, user, info) {
  //   // tslint:disable-next-line:no-console
  //   console.log(err, user, info);
  //   // tslint:disable-next-line:no-console
  //   if (err || !user) {

  //     if (info.message === 'jwt expired') {
  //       throw new UnauthorizedException('过期了', info.message);
  //     } else if (info.message === 'No auth token') {
  //       throw new UnauthorizedException('No auth token', info.message);
  //     } else {
  //       throw new UnauthorizedException('aaaa', info.message);
  //     }
  //   }
  //   return user;
  // }

}
