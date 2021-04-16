export interface IFavoriteService {
  getFavorites(userId: string): Promise<IFavorite[]>;
  saveFavorite(userId: string, id: string): Promise<IFavorite>;
  getFavorite(userId: string, id: string): Promise<IFavorite>;
}

export interface IFavoriteRepository {
  saveFavorite(userId: string, id: string): Promise<IFavorite>;
  getFavorites(userId: string): Promise<IFavorite[]>;
  getFavorite(userId: string, id: string): Promise<IFavorite | undefined>;
}

export interface IFavorite {
  id?: any;
  userId: string;
  characterId: string;
}
