import mongoose from 'mongoose';
import { regexUrl } from '../utils/const';
import { TCard } from '../utils/types';

const cardSchema = new mongoose.Schema<TCard>({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(v: string) {
        return v.match(regexUrl);
      },
      message: 'Переданный вами URL картинки не валиден',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
      },
    ],
    default: [],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model<TCard>('Card', cardSchema);
