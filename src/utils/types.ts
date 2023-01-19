import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import mongoose, { Model, Document } from 'mongoose';

export type TCard = {
  name: string,
  link: string,
  owner: mongoose.Schema.Types.ObjectId,
  likes: mongoose.Schema.Types.ObjectId[],
  createdAt: Date,
};

export type TUser = {
  name: string,
  about: string,
  avatar: string,
  email: string,
  password: string
};

export interface IAuthRequest extends Request {
  user?: string | JwtPayload;
}

export interface ISessionRequest extends Request {
  user?: {
    _id: string
  }
}

export interface IUserModel extends Model<TUser> {
  // eslint-disable-next-line no-unused-vars
  findUserByCredentials: (email: string, password: string) => Promise<Document<TUser>>
}

export interface IError extends Error {
  statusCode: number;
  code?: number;
}
