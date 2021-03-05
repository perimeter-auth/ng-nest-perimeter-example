import {
  CanActivate,
  ExecutionContext,
  Injectable,
  SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

export const Scopes = (...scopes: string[]) => SetMetadata('scopes', scopes);

@Injectable()
export class ScopesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const scopes = this.reflector.get<string[]>('scopes', context.getHandler());
    if (!scopes) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const hasScope = () =>
      user.scope.split(' ').some((scope) => scopes.includes(scope));
    return user && user.scope && hasScope();
  }
}
