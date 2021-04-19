import { expect } from 'chai';
import {
  IAuthResponse,
  IAuthService,
} from '../../../src/interfaces/auth.interface';
import { IUser, UserStatus } from '../../../src/interfaces/user.interface';
import AuthService from '../../../src/services/auth.service';

describe('Auth Service', () => {
  let service: IAuthService;

  before(() => (service = new AuthService()));

  describe('on encryptPassword', () => {
    it('should return the encrypted password', async () => {
      const encryptedPassword: string = service.encryptPassword('somePassword');
      expect(encryptedPassword).to.not.be.undefined;
    });
  });

  describe('on validate credentials', () => {
    describe('on user have same credentials', () => {
      it('should not throw error', async () => {
        const user: IUser = {
          id: 'someUserId',
          username: 'someUsername',
          password: service.encryptPassword('somePassword'),
          lastConnection: new Date().toISOString(),
          status: UserStatus.OK,
        };

        expect(
          async () => await service.validateCredentials(user, 'somePassword'),
        ).to.not.throws();
      });
    });

    describe('on user with incorrect credentials', () => {
      it('should throw error', async () => {
        const user: IUser = {
          id: 'someUserId',
          username: 'someUsername',
          password: service.encryptPassword('somePassword'),
          lastConnection: new Date().toISOString(),
          status: UserStatus.OK,
        };

        try {
          await service.validateCredentials(user, 'otherPassword');
        } catch (e) {
          expect(e.message).to.be.equals('invalid credentials');
        }
      });
    });
  });

  describe('on get access token', () => {
    it('should return the token generated', async () => {
      process.env.SECRET = 'someSecret';

      const user: IUser = {
        id: 'someUserId',
        username: 'someUsername',
        password: 'someHashPassword',
        lastConnection: new Date().toISOString(),
        status: UserStatus.OK,
      };

      const token: IAuthResponse = await service.getAccessToken(user);
      expect(token).to.not.be.undefined;
    });
  });
});
