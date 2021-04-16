import { Singleton } from 'typescript-ioc';
import { v4 } from 'uuid';
import {
  IFavorite,
  IFavoriteRepository,
} from '../../interfaces/favorite.interface';
import { FavoriteModel } from './favorite.model';

@Singleton
export default class FavoriteRepository implements IFavoriteRepository {
  async saveFavorite(userId: string, id: string): Promise<IFavorite> {
    const doc = await FavoriteModel.create({
      id: v4(),
      userId,
      characterId: id,
    });

    return doc.toJSON();
  }

  async getFavorites(userId: string): Promise<IFavorite[]> {
    const docs = await FavoriteModel.find({ userId });
    return docs.map((f) => f.toJSON());
  }

  async getFavorite(
    userId: string,
    id: string,
  ): Promise<IFavorite | undefined> {
    const doc = await FavoriteModel.findOne({ userId, characterId: id });
    return doc?.toJSON();
  }
}
