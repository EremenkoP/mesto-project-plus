import { NextFunction, Request, Response } from 'express';
import {
  CREATED, INTERNAL_SERVER_ERROR, NOT_FOUND, BAD_REQUEST, DONE,
  FORBIDDEN,
} from '../utils/errors';
import Card from '../models/card';
import { CAST_ERROR, VALIDATION_ERROR } from '../utils/const';
import BadRequestError from '../errors/BadRequestError';
import { ISessionRequest } from '../utils/types';
import NotFoundError from '../errors/NotFoundError';
import ForbiddenError from '../errors/ForbiddenError';

export const getCards = (req: Request, res: Response, next: NextFunction) => Card.find({})
  .then((cards) => res.status(DONE.code).send({ data: cards }))
  .catch(next);

export const createCard = (req: Request, res: Response, next: NextFunction) => {
  const { name, link } = req.body;
  const owner = (req as any).user?._id;
  return Card.create({ name, link, owner })
    .then((card) => res.status(CREATED.code).send({ data: card }))
    .catch((err) => {
      if (err.name === VALIDATION_ERROR) {
        next(new BadRequestError(BAD_REQUEST.message.cardCreate));
      } else {
        next(err);
      }
    });
};

export const deleteCard = (req: Request, res: Response, next: NextFunction) => {
  const _id = req.params.cardId;
  Card.findById(_id)
    .then((card) => {
      if (!card) {
        throw new NotFoundError(NOT_FOUND.message.cardDelete);
      }
      if (card.owner.toString() !== _id) {
        throw new ForbiddenError(FORBIDDEN.message.card);
      }
      return Card.findByIdAndDelete(_id);
    })
    .then(() => res.status(DONE.code).send({ message: DONE.message.deleteCard }))
    .catch((err) => {
      if (err.name === CAST_ERROR) {
        next(new BadRequestError(err.message));
      } else {
        next(err);
      }
    });
};

export const likeCard = (req: ISessionRequest, res: Response, next: NextFunction) => {
  const id = req.params;
  const owner = req.user?._id;
  Card.findByIdAndUpdate(
    id,
    { $addToSet: { likes: owner } },
    { new: true, runValidators: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError(NOT_FOUND.message.actionLikeCard);
      } else {
        res.status(DONE.code).send({ data: card });
      }
    })
    .catch((err) => {
      if (err.name === CAST_ERROR) {
        next(new BadRequestError(BAD_REQUEST.message.actionLikeCard));
      } else {
        next(err);
      }
    });
};

export const dislikeCard = (req: ISessionRequest, res: Response, next: NextFunction) => {
  const id = req.params.cardId;
  const owner = (req as any).user._id;
  Card.findByIdAndUpdate(
    id,
    { $pull: { likes: owner } },
    { new: true, runValidators: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError(NOT_FOUND.message.actionLikeCard);
      } else {
        res.status(DONE.code).send({ data: card });
      }
    })
    .catch((err) => {
      if (err.name === CAST_ERROR) {
        next(new BadRequestError(BAD_REQUEST.message.actionLikeCard));
      } else {
        res
          .status(INTERNAL_SERVER_ERROR.code)
          .send({ message: INTERNAL_SERVER_ERROR.message });
      }
    });
};
