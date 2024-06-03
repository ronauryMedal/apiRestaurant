import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from '../enums/roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(private reflector:Reflector) { }
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {

      const requiredroles = this.reflector.getAllAndOverride<Role[]>('roles', [context.getHandler(), context.getClass()]);
      if (!requiredroles) {
        return true;
      }


      const {user} = context.switchToHttp().getRequest();
     console.log(user)

    return requiredroles.some((role) => user.roles?.includes(role));
  }
}
