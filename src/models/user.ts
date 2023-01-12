import mongoose from 'mongoose';
import regexUrl from '../utils/const';
import { TUser } from '../utils/types';

const userSchema = new mongoose.Schema<TUser>({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 200,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(v: string) {
        return v.match(regexUrl);
      },
      message: 'Переданный вами URL аватара не валиден',
    },
  },
});

export default mongoose.model<TUser>('User', userSchema);
