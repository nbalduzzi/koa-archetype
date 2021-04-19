import { Schema } from 'mongoose';
import { UserDocument } from './user.types';

const UserSchema = new Schema<UserDocument>(
  {
    id: String,
    username: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    lastConnection: String,
  },
  {
    toJSON: {
      transform: (_, ret) => {
        delete ret._id;
        delete ret.__v;
      },
    },
  },
);

export default UserSchema;
