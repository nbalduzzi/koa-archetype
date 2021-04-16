import { Inject, Singleton } from 'typescript-ioc';
import { notFound, badRequest } from 'boom';
import { IFavorite, IFavoriteService } from '../interfaces/favorite.interface';
import FavoriteRepository from '../repositories/favorites/favorite.repository';

@Singleton
export default class FavoriteService implements IFavoriteService {
  constructor(
    @Inject private readonly favoriteRepository: FavoriteRepository,
  ) {}

  async saveFavorite(userId: string, id: string): Promise<IFavorite> {
    const favorite = await this.favoriteRepository.getFavorite(userId, id);
    if (favorite) throw badRequest('favorite already exists');

    return await this.favoriteRepository.saveFavorite(userId, id);
  }

  async getFavorites(userId: string): Promise<IFavorite[]> {
    return await this.favoriteRepository.getFavorites(userId);
  }

  async getFavorite(userId: string, id: string): Promise<IFavorite> {
    const favorite = await this.favoriteRepository.getFavorite(userId, id);
    if (!favorite) throw notFound('favorite not found');

    return favorite;
  }
}
