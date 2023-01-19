import { AUTHORIZATION } from '../utils/errors';

export default class UnauthorizedError extends Error {
  private statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = AUTHORIZATION.code;
  }
}
