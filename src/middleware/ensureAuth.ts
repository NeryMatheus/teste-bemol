import { Request, Response, NextFunction } from 'express';
import authConfig from '../config/Auth';
import { AppError } from '../common/errors/AppError';
import { verifyJwtToken } from '../common/utils/VerifyToken';
import { extractToken } from '../common/utils/ExtractToken';

const ensureAuth = (
  request: Request,
  response: Response,
  next: NextFunction
): void => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing', 401);
  }

  const token = extractToken(authHeader);
  if (!token) {
    throw new AppError('JWT token is malformed', 401);
  }

  if (!authConfig.jwt.secret) {
    throw new AppError('JWT secret is missing', 500);
  }

  const decoded = verifyJwtToken(token);

  if (!decoded.sub) {
    throw new AppError('Invalid JWT token: subject is missing', 401);
  }

  request.customer = { id: decoded.sub };

  return next();
};

export { ensureAuth };
