import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import {
  CREATED, INTERNAL_SERVER_ERROR, NOT_FOUND, BAD_REQUEST, DONE, AUTHORIZATION,
} from '../utils/errors';
import User from '../models/user';
import { TOKEN_PASSWORD } from '../utils/const';

export const getUsers = (req: Request, res: Response) => User.find({})
  .then((users) => res.status(DONE.code).send({ data: users }))
  .catch(() => res
    .status(INTERNAL_SERVER_ERROR.code)
    .send({ message: INTERNAL_SERVER_ERROR.message }));

export const getUserById = (req: Request, res: Response) => {
  const id = req.params.userId;
  return User.findById(id)
    .orFail(new Error('NotValidGetUserById'))
    .then((user) => res.status(DONE.code).send({ data: user }))
    .catch((err) => {
      if (err.message === 'NotValidGetUserById') {
        res
          .status(NOT_FOUND.code)
          .send({ message: NOT_FOUND.message.getUser });
      } else {
        res
          .status(INTERNAL_SERVER_ERROR.code)
          .send({ message: INTERNAL_SERVER_ERROR.message });
      }
    });
};

export const createUser = (req: Request, res: Response) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  return User.create({
    name, about, avatar, email, password,
  })
    .then((user) => res
      .status(CREATED.code)
      .send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(BAD_REQUEST.code)
          .send({ message: BAD_REQUEST.message.userCreate });
      } else {
        res
          .status(INTERNAL_SERVER_ERROR.code)
          .send({ message: INTERNAL_SERVER_ERROR.message });
      }
    });
};

export const updateUser = (req: Request, res: Response) => {
  const _id = (req as any).user?._id;
  const { name, about } = req.body;
  return User.findByIdAndUpdate(_id, { name, about }, { new: true, runValidators: true })
    .orFail(new Error('NotValidUpdateUser'))
    .then((user) => {
      if (!user) {
        res.status(NOT_FOUND.code).send({ message: NOT_FOUND.message.getUser });
      } else {
        res.status(DONE.code).send({ data: user });
      }
    })
    .catch((err) => {
      if (err.message === 'NotValidUpdateUser') {
        res
          .status(BAD_REQUEST.code)
          .send({ message: BAD_REQUEST.message.userUpdate });
      } else {
        res
          .status(INTERNAL_SERVER_ERROR.code)
          .send({ message: INTERNAL_SERVER_ERROR.message });
      }
    });
};

export const updateAvatar = (req: Request, res: Response) => {
  const _id = (req as any).user?._id;
  const { avatar } = req.body;
  return User.findByIdAndUpdate(_id, { avatar }, { new: true, runValidators: true })
    .orFail(new Error('NotValidUpdateUser'))
    .then((user) => {
      if (!user) {
        res.status(NOT_FOUND.code).send({ message: NOT_FOUND.message.getUser });
      } else {
        res.status(DONE.code).send({ data: user });
      }
    })
    .catch((err) => {
      if (err.message === 'NotValidUpdateUser') {
        res
          .status(BAD_REQUEST.code)
          .send({ message: BAD_REQUEST.message.avatarUpdate });
      } else {
        res
          .status(INTERNAL_SERVER_ERROR.code)
          .send({ message: INTERNAL_SERVER_ERROR.message });
      }
    });
};
