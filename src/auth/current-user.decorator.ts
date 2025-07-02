import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export interface User {
  id: string;
  email: string;
  roles: string[];
  // Add more properties as needed
}

// Helper function to extract user from request context
const getCurrentUserByContext = (context: ExecutionContext): User => {
  const request = context.switchToHttp().getRequest<Request>(); // Type-safe request
  return request.user as User; // Still casting, but now from a typed request
};

// Custom decorator to access the current user
export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext): User => getCurrentUserByContext(context),
);
