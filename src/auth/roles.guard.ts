// // src/auth/roles.guard.ts
// import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import { JwtAuthGuard } from './jwt-auth.guard'; // Use your JwtAuthGuard

// @Injectable()
// export class RolesGuard extends JwtAuthGuard implements CanActivate {
//   constructor(private reflector: Reflector) {
//     super();
//   }

//   canActivate(context: ExecutionContext): boolean {
//     const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
//     if (!requiredRoles) {
//       return true;
//     }
//     const user = context.switchToHttp().getRequest().user;
//     return requiredRoles.some(role => user.role.includes(role));
//   }
// }
