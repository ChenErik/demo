import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Observable } from 'rxjs'
import type { Request } from 'express'
@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private Reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const admin = this.Reflector.get<string[]>('role', context.getHandler())
    const request = context.switchToHttp().getRequest<Request>()
    return admin.includes(request.query.role as string)
  }
}
