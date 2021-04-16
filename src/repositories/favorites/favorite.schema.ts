import { Schema } from 'mongoose';
import { FavoriteDocument } from './favorite.types';

const FavoriteSchema = new Schema<FavoriteDocument>(
  {
    id: String,
    userId: {
      type: String,
      required: true,
    },
    characterId: {
      type: String,
      required: true,
    },
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

FavoriteSchema.index({ userId: 1, characterId: 1 }, { unique: true });

export default FavoriteSchema;
