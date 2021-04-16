import { model } from 'mongoose';
import FavoriteSchema from './favorite.schema';
import { FavoriteDocument } from './favorite.types';

export const FavoriteModel = model<FavoriteDocument>(
  'favorite',
  FavoriteSchema,
);
