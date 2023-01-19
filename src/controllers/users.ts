import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import ConflictError from '../errors/ConflictError';
import {
  CREATED, NOT_FOUND, BAD_REQUEST, DONE, CONFLICT,
} from '../utils/errors';
import User from '../models/user';
import {
  CAST_ERROR, TOKEN_LIFE, TOKEN_PASSWORD, VALIDATION_ERROR,
} from '../utils/const';
import { ISessionRequest } from '../utils/types';
import NotFoundError from '../errors/NotFoundError';
import BadRequestError from '../errors/BadRequestError';

export const getUsers = (req: Request, res: Response, next: NextFunction) => User.find({})
  .then((users) => res.status(DONE.code).send({ data: users }))
  .catch(next);

export const getUserById = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.userId;
  return User.findById(id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(NOT_FOUND.message.getUser);
      }
      res.status(DONE.code).send({ data: user });
    })
    .catch((err) => {
      if (err.name === CAST_ERROR) {
        next(new BadRequestError(err.message));
      } else {
        next(err);
      }
    });
};

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  return bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    })
      .then((user) => res
        .status(CREATED.code)
        .send({
          _id: user._id,
          name: user.name,
          about: user.about,
          avatar: user.avatar,
          email: user.email,
          token: jwt.sign({ _id: user._id }, TOKEN_PASSWORD, { expiresIn: TOKEN_LIFE }),
        }))
      .catch((err) => {
        if (err.name === VALIDATION_ERROR) {
          next(new BadRequestError(err.message));
        } else if (err.code === CONFLICT.code) {
          next(new ConflictError(CONFLICT.message.user));
        } else {
          next(err);
        }
      }));
};

export const updateUser = (req: Request, res: Response, next: NextFunction) => {
  const _id = (req as any).user?._id;
  User.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true })
    .orFail(() => new NotFoundError(NOT_FOUND.message.getUser))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === VALIDATION_ERROR) {
        next(new BadRequestError(BAD_REQUEST.message.userUpdate));
      } else {
        next(err);
      }
    });
};

export const updateAvatar = (req: Request, res: Response, next: NextFunction) => {
  const _id = (req as any).user?._id;
  const { avatar } = req.body;
  User.findByIdAndUpdate(_id, { ...req.body, avatar }, { new: true, runValidators: true })
    .orFail(() => new NotFoundError(NOT_FOUND.message.getUser))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === VALIDATION_ERROR) {
        next(new BadRequestError(BAD_REQUEST.message.avatarUpdate));
      } else {
        next(err);
      }
    });
};

export const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  const { JWT_SECRET = TOKEN_PASSWORD } = process.env;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      res.send({
        token: jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: TOKEN_LIFE }),
      });
    })
    .catch(next);
};

export const getUser = (req: ISessionRequest, res: Response, next: NextFunction) => {
  const userId = req.user?._id;
  User.findById(userId)
    .orFail(() => new NotFoundError(NOT_FOUND.message.getUser))
    .then((user) => {
      if (!user) {
        throw new NotFoundError(NOT_FOUND.message.getUser);
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === CAST_ERROR) {
        next(new NotFoundError(NOT_FOUND.message.getUser));
      }
      if (err.name === VALIDATION_ERROR) {
        next(new BadRequestError(err.message));
      } else {
        next(err);
      }
    });
};
