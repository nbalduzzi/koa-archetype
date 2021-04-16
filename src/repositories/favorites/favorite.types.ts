import { Document } from 'mongoose';
import { IFavorite } from '../../interfaces/favorite.interface';

export interface FavoriteDocument extends IFavorite, Document {}
