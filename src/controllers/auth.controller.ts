import { Body, Post, Route, Security, Tags } from 'tsoa';
import { Inject, Singleton } from 'typescript-ioc';
import UserService from '../services/user.service';
import AuthService from '../services/auth.service';
import {
  IAuthController,
  IAuthPayload,
  IAuthResponse,
} from '../interfaces/auth.interface';
import { IUser } from '../interfaces/user.interface';

@Singleton
@Security('api_key')
@Route('auth')
@Tags('auth')
export default class AuthController implements IAuthController {
  constructor(
    @Inject private readonly userService: UserService,
    @Inject private readonly authService: AuthService,
  ) {}

  @Post('/register')
  async register(@Body() { username, password }: IAuthPayload): Promise<IUser> {
    const crypedPassword: string = this.authService.encryptPassword(password);
    return await this.userService.saveUser(username, crypedPassword);
  }

  @Post('/login')
  async login(
    @Body() { username, password }: IAuthPayload,
  ): Promise<IAuthResponse> {
    const user: IUser = await this.userService.getUserByUsername(username);
    await this.userService.validateUserStatus(user);
    await this.authService.validateCredentials(user, password);

    return await this.authService.getAccessToken(user);
  }
}
