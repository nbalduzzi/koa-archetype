import { Singleton } from 'typescript-ioc';
import { createHash } from 'crypto';
import { forbidden } from 'boom';
import { sign } from 'jsonwebtoken';
import { IAuthResponse, IAuthService } from '../interfaces/auth.interface';
import { IUser } from '../interfaces/user.interface';

@Singleton
export default class AuthService implements IAuthService {
  encryptPassword(password: string): string {
    return createHash('sha256').update(password).digest('hex');
  }

  async validateCredentials(user: IUser, password: string): Promise<void> {
    if (user.password !== this.encryptPassword(password)) {
      throw forbidden('invalid credentials');
    }
  }

  async getAccessToken(user: IUser): Promise<IAuthResponse> {
    return {
      token: sign(
        { userId: user.id, username: user.username },
        process.env.SECRET!,
        {
          algorithm: 'HS256',
          expiresIn: process.env.JWT_EXPIRE_IN || 60,
        },
      ),
    };
  }
}
