import { CanActivate, ExecutionContext } from '@nestjs/common';

export class AuthGuard2 implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    console.log(request);
    return true;
  }
}
