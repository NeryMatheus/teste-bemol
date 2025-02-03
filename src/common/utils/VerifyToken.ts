import { verify } from 'jsonwebtoken';
import { AppError } from '../errors/AppError';
import authConfig from '../../config/Auth';

export const verifyJwtToken = (token: string): ITokenPayload => {
  try {
    if (!authConfig.jwt.secret) {
      throw new AppError('JWT secret is missing', 500);
    }
    return verify(token, authConfig.jwt.secret) as ITokenPayload;
  } catch {
    throw new AppError('Invalid JWT token', 401);
  }
};
