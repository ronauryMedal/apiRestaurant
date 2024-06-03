import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { JWT_SECRET } from '../constants/jwt.constant';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor( private readonly jwtService: JwtService) {}
 async canActivate(context: ExecutionContext,): Promise<boolean>  {

    const req = context.switchToHttp().getRequest();
    console.log(req.headers.authorization);
    const token = this.extractTokenFromHeader(req);
    if (!token) {
      throw new UnauthorizedException()
    }
    try {
      const payload = this.jwtService.verify(token, { secret: JWT_SECRET.secret});
      req.user = payload;
      
    } catch {
      
      throw new UnauthorizedException()
    }



    return true;
  }


  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
