import { IFavorite } from './favorite.interface';

export interface IUserController {
  getUserByUsername(username: string): Promise<IUser>;
  getUserFavorites(userId: string): Promise<IFavorite[]>;
  saveUserFavorite(userId: string, id: string): Promise<IFavorite>;
  getUserFavorite(userId: string, id: string): Promise<IFavorite>;
}

export interface IUserService {
  saveUser(username: string, password: string): Promise<IUser>;
  getUserByUsername(username: string): Promise<IUser>;
  validateUserStatus(user: IUser): Promise<void>;
}

export interface IUserRepository {
  saveUser(username: string, password: string): Promise<IUser>;
  getUserByUsername(username: string): Promise<IUser | undefined>;
}

export interface IUser {
  id?: any;
  username: string;
  password: string;
  status: UserStatus;
  lastConnection: string;
}

export interface IUserResister {
  username: string;
  password: string;
}

export enum UserStatus {
  OK = 'OK',
  BANNED = 'BANNED',
  DELETED = 'DELETED',
}
