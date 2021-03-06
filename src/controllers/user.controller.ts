import { Get, Put, Route, Security, Tags } from 'tsoa';
import { Inject, Singleton } from 'typescript-ioc';
import { IUser, IUserController } from '../interfaces/user.interface';
import UserService from '../services/user.service';
import FavoriteService from '../services/favorite.service';
import { IFavorite } from '../interfaces/favorite.interface';

@Singleton
@Security('api_key')
@Route('users')
@Tags('users')
export default class UserController implements IUserController {
  constructor(
    @Inject private readonly userService: UserService,
    @Inject private readonly favoriteService: FavoriteService,
  ) {}

  @Get(`{username}`)
  async getUserByUsername(username: string): Promise<IUser> {
    return await this.userService.getUserByUsername(username);
  }

  @Get(`{userId}/favorites`)
  async getUserFavorites(userId: string): Promise<IFavorite[]> {
    return await this.favoriteService.getFavorites(userId);
  }

  @Put(`{userId}/favorites/{id}`)
  async saveUserFavorite(userId: string, id: string): Promise<IFavorite> {
    return await this.favoriteService.saveFavorite(userId, id);
  }

  @Get(`{userId}/favorites/{id}`)
  async getUserFavorite(userId: string, id: string): Promise<IFavorite> {
    return await this.favoriteService.getFavorite(userId, id);
  }
}
