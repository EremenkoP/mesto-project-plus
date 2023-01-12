import { Request, Response } from 'express';
import {
  CREATED, INTERNAL_SERVER_ERROR, NOT_FOUND, BAD_REQUEST, DONE,
} from '../utils/errors';
import Card from '../models/card';

export const getCards = (req: Request, res: Response) => Card.find({})
  .then((cards) => res.status(DONE.code).send({ data: cards }))
  .catch(() => res
    .status(INTERNAL_SERVER_ERROR.code)
    .send({ message: INTERNAL_SERVER_ERROR.message }));

export const createCard = (req: Request, res: Response) => {
  const { name, link } = req.body;
  const owner = (req as any).user?._id;
  return Card.create({ name, link, owner })
    .then((card) => res.status(CREATED.code).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(BAD_REQUEST.code)
          .send({ message: BAD_REQUEST.message.cardCreate });
      } else {
        res
          .status(INTERNAL_SERVER_ERROR.code)
          .send({ message: INTERNAL_SERVER_ERROR.message });
      }
    });
};

export const deleteCard = (req: Request, res: Response) => {
  const _id = req.params.cardId;
  return Card.deleteOne({ _id })
    .orFail(new Error('NotValidDeleteCard'))
    .then((data) => res.status(DONE.code).send({ data }))
    .catch((err) => {
      if (err.message === 'NotValidDeleteCard') {
        res
          .status(NOT_FOUND.code)
          .send({ message: NOT_FOUND.message.cardDelete });
      } else {
        res
          .status(INTERNAL_SERVER_ERROR.code)
          .send({ message: INTERNAL_SERVER_ERROR.message });
      }
    });
};

export const likeCard = (req: Request, res: Response) => {
  const id = req.params.cardId;
  const owner = (req as any).user._id;
  return Card.findByIdAndUpdate(
    id,
    { $addToSet: { likes: owner } },
    { new: true, runValidators: true },
  )
    .orFail(new Error('NotValidLikeCard'))
    .then((card) => {
      if (!card) {
        res.status(NOT_FOUND.code).send({ message: NOT_FOUND.message.actionLikeCard });
      } else {
        res.status(DONE.code).send({ data: card });
      }
    })
    .catch((err) => {
      if (err.message === 'NotValidLikeCard') {
        res
          .status(BAD_REQUEST.code)
          .send({ message: BAD_REQUEST.message.actionLikeCard });
      } else {
        res
          .status(INTERNAL_SERVER_ERROR.code)
          .send({ message: INTERNAL_SERVER_ERROR.message });
      }
    });
};

export const dislikeCard = (req: Request, res: Response) => {
  const id = req.params.cardId;
  const owner = (req as any).user._id;
  return Card.findByIdAndUpdate(
    id,
    { $pull: { likes: owner } },
    { new: true, runValidators: true },
  )
    .orFail(new Error('NotValidDisLikeCard'))
    .then((card) => {
      if (!card) {
        res.status(NOT_FOUND.code).send({ message: NOT_FOUND.message.actionLikeCard });
      } else {
        res.status(DONE.code).send({ data: card });
      }
    })
    .catch((err) => {
      if (err.message === 'NotValidDisLikeCard') {
        res
          .status(BAD_REQUEST.code)
          .send({ message: BAD_REQUEST.message.actionLikeCard });
      } else {
        res
          .status(INTERNAL_SERVER_ERROR.code)
          .send({ message: INTERNAL_SERVER_ERROR.message });
      }
    });
};
