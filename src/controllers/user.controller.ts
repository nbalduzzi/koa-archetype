import { Inject, Singleton } from 'typescript-ioc';
import { IUser, IUserController } from '../interfaces/user.interface';
import UserService from '../services/user.service';
import FavoriteService from '../services/favorite.service';
import { IFavorite } from '../interfaces/favorite.interface';

@Singleton
export default class UserController implements IUserController {
  constructor(
    @Inject private readonly userService: UserService,
    @Inject private readonly favoriteService: FavoriteService,
  ) {}

  async registerUser(username: string, password: string): Promise<IUser> {
    return await this.userService.saveUser(username, password);
  }

  async getUserByUsername(username: string): Promise<IUser> {
    return await this.userService.getUserByUsername(username);
  }

  async getUserFavorites(userId: string): Promise<IFavorite[]> {
    return await this.favoriteService.getFavorites(userId);
  }

  async saveUserFavorite(userId: string, id: string): Promise<IFavorite> {
    return await this.favoriteService.saveFavorite(userId, id);
  }

  async getUserFavorite(userId: string, id: string): Promise<IFavorite> {
    return await this.favoriteService.getFavorite(userId, id);
  }
}
