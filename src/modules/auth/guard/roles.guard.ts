import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from 'src/common/enums/rol.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const rolesFromMethod = this.reflector.get<Role[]>(
      ROLES_KEY,
      context.getHandler(),
    );
    const rolesFromClass = this.reflector.get<Role[]>(
      ROLES_KEY,
      context.getClass(),
    );

    const requiredRoles = rolesFromMethod || rolesFromClass;
    if (!requiredRoles) return true;

    const user = context.switchToHttp().getRequest()?.user;

    if (!user?.role) {
      throw new ForbiddenException(
        'Acceso denegado: No tienes un rol asignado',
      );
    }

    if (!requiredRoles.includes(user.role as Role)) {
      throw new ForbiddenException(
        'Acceso denegado: No tienes el rol necesario',
      );
    }

    return true;
  }
}
