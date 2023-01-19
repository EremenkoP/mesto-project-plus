import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import UnauthorizedError from '../errors/UnauthorizedError';
import { NOT_FOUND } from '../utils/errors';
import {
  DEFAULT_USER_ABOUT, DEFAULT_USER_AVATAR, DEFAULT_USER_NAME, regexEmail, regexUrl,
} from '../utils/const';
import { IUserModel, TUser } from '../utils/types';

const userSchema = new mongoose.Schema<TUser>({
  name: {
    type: String,
    required: [true, 'Это обязательное поле'],
    minlength: [2, 'Поле должно содержать от 2 до 30 символов'],
    maxlength: [30, 'Поле должно содержать от 2 до 30 символов'],
    default: DEFAULT_USER_NAME,
  },
  about: {
    type: String,
    required: [true, 'Это обязательное поле'],
    minlength: [2, 'Поле должно содержать от 2 до 200 символов'],
    maxlength: [200, 'Поле должно содержать от 2 до 200 символов'],
    default: DEFAULT_USER_ABOUT,
  },
  avatar: {
    type: String,
    required: [true, 'Это обязательное поле'],
    default: DEFAULT_USER_AVATAR,
    validate: {
      validator(v: string) {
        return v.match(regexUrl);
      },
      message: 'Переданный вами URL аватара не валиден',
    },
  },
  email: {
    type: String,
    required: [true, 'Это обязательное поле'],
    unique: true,
    validate: {
      validator(v: string) {
        return v.match(regexEmail);
      },
      message: 'Переданный вами email аватара не валиден',
    },
  },
  password: {
    type: String,
    required: [true, 'Это обязательное поле'],
    select: false,
  },
});

userSchema.static('findUserByCredentials', function findUserByCredentials(email: string, password: string) {
  return this.findOne({ email })
    .select('+password')
    .then((user: TUser | null) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError(NOT_FOUND.message.getUser));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnauthorizedError(NOT_FOUND.message.getUser));
          }
          return user;
        });
    });
});

export default mongoose.model<TUser, IUserModel>('User', userSchema);
