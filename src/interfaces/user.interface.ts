import { IFavorite } from './favorite.interface';

export interface IUserController {
  registerUser(username: string, password: string): Promise<IUser>;
  getUserByUsername(username: string): Promise<IUser>;
  getUserFavorites(userId: string): Promise<IFavorite[]>;
  saveUserFavorite(userId: string, id: string): Promise<IFavorite>;
  getUserFavorite(userId: string, id: string): Promise<IFavorite>;
}

export interface IUserService {
  saveUser(username: string, password: string): Promise<IUser>;
  getUserByUsername(username: string): Promise<IUser>;
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

export enum UserStatus {
  OK = 'OK',
  BANNED = 'BANNED',
  DELETED = 'DELETED',
}
