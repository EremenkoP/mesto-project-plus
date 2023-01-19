import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import UnauthorizedError from '../errors/UnauthorizedError';
import { AUTHORIZATION } from '../utils/errors';
import { TOKEN_PASSWORD } from '../utils/const';
import { IAuthRequest } from '../utils/types';

const extractBearerToken = (header: string) => header.replace('Bearer ', '');

const auth = (req: IAuthRequest, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError(AUTHORIZATION.message.notToken);
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, TOKEN_PASSWORD);
  } catch (err) {
    throw new UnauthorizedError(AUTHORIZATION.message.unValidToken);
  }

  req.user = payload;

  next();
};

export default auth;
