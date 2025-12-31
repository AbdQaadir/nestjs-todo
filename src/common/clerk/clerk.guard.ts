// src/common/guards/auth.guard.ts
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { getAuth } from '@clerk/express';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const { userId } = getAuth(req);

    if (!userId) {
      throw new UnauthorizedException('Authentication required');
    }

    // Optional: attach auth info to request
    // req.userId = userId;

    return true;
  }
}
