import mongoose from 'mongoose';

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
};
