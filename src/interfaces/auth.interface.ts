import { IUser } from './user.interface';

export interface IAuthController {
  register(body: IAuthPayload): Promise<IUser>;
  login(body: IAuthPayload): Promise<IAuthResponse>;
}

export interface IAuthService {
  encryptPassword(password: string): string;
  validateCredentials(user: IUser, password: string): Promise<void>;
  getAccessToken(user: IUser): Promise<IAuthResponse>;
}

export interface IAuthPayload {
  username: string;
  password: string;
}

export interface IAuthResponse {
  token: string;
}
