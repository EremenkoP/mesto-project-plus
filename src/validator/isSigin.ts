import { celebrate, Joi } from 'celebrate';
import {
  regexUrl, USER_ERR_ABOUT, USER_ERR_AVATAR, USER_ERR_EMAIL, USER_ERR_EMAIL_EMPTY, USER_ERR_NAME,
  USER_ERR_PASSWORD_EMPTY, USER_ERR_PASSWORD_LEN,
} from '../utils/const';

export const isSignUpRequestValid = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).message(USER_ERR_NAME),
    about: Joi.string().min(2).max(200).message(USER_ERR_ABOUT),
    avatar: Joi.string().pattern(regexUrl).message(USER_ERR_AVATAR),
    email: Joi.string().required().email().messages({
      'any.required': USER_ERR_EMAIL_EMPTY,
      'string.email': USER_ERR_EMAIL,
    }),
    password: Joi.string().required().min(6).messages({
      'any.required': USER_ERR_PASSWORD_EMPTY,
      'string.min': USER_ERR_PASSWORD_LEN,
    }),
  }),
});

export const isSignInRequestValid = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      'any.required': USER_ERR_EMAIL_EMPTY,
      'string.email': USER_ERR_EMAIL,
    }),
    password: Joi.string().required().min(6).messages({
      'any.required': USER_ERR_PASSWORD_EMPTY,
      'string.min': USER_ERR_PASSWORD_LEN,
    }),
  }),
});
