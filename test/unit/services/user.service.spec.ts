import { expect } from 'chai';
import { SinonStubbedInstance, createStubInstance } from 'sinon';
import {
  IUser,
  IUserService,
  UserStatus,
} from '../../../src/interfaces/user.interface';
import UserRepository from '../../../src/repositories/users/user.repository';
import UserService from '../../../src/services/user.service';

describe('User Service', () => {
  let repository: SinonStubbedInstance<UserRepository>;
  let service: IUserService;

  before(() => {
    repository = createStubInstance(UserRepository);
    service = new UserService(repository);
  });

  describe('on get user by username', () => {
    describe('on user found', () => {
      it('should return the user', async () => {
        repository.getUserByUsername.resolves({
          id: 'someUserId',
          username: 'someUsername',
          password: 'someHashPassword',
          lastConnection: new Date().toISOString(),
          status: UserStatus.OK,
        });

        const user: IUser = await service.getUserByUsername('someUsername');
        expect(user.username).to.be.equals('someUsername');
        expect(user.password).to.be.equals('someHashPassword');
        expect(user.status).to.be.equals(UserStatus.OK);
      });
    });

    describe('on user not found', () => {
      it('should return `user not found` error', async () => {
        repository.getUserByUsername.resolves(undefined);

        try {
          await service.getUserByUsername('someUsername');
        } catch (e) {
          expect(e.message).to.be.equals('user not found');
        }
      });
    });
  });

  describe('on save user', () => {
    describe('on no exist user before', () => {
      it('should return the user created', async () => {
        repository.getUserByUsername.resolves(undefined);
        repository.saveUser.resolves({
          id: 'someUserId',
          username: 'someUsername',
          password: 'someHashPassword',
          lastConnection: new Date().toISOString(),
          status: UserStatus.OK,
        });

        const user: IUser = await service.saveUser(
          'someUsername',
          'somePassword',
        );

        expect(user.username).to.be.equals('someUsername');
        expect(user.password).to.be.equals('someHashPassword');
        expect(user.status).to.be.equals(UserStatus.OK);
      });
    });

    describe('on exist user already', () => {
      it('should throw `user already exists` error', async () => {
        repository.getUserByUsername.resolves({
          id: 'someUserId',
          username: 'someUsername',
          password: 'someHashPassword',
          lastConnection: new Date().toISOString(),
          status: UserStatus.OK,
        });

        try {
          await service.saveUser('someUsername', 'somePassword');
        } catch (e) {
          expect(e.message).to.be.equals('user already exists');
        }
      });
    });
  });

  describe('on validate user status', () => {
    describe('on `OK` status', () => {
      it('should not throw error', () => {
        const user: IUser = {
          id: 'someUserId',
          username: 'someUsername',
          password: 'someHashPassword',
          lastConnection: new Date().toISOString(),
          status: UserStatus.OK,
        };

        expect(
          async () => await service.validateUserStatus(user),
        ).to.not.throws();
      });
    });

    describe('on `BANNED` status', () => {
      it('should throw error', async () => {
        const user: IUser = {
          id: 'someUserId',
          username: 'someUsername',
          password: 'someHashPassword',
          lastConnection: new Date().toISOString(),
          status: UserStatus.BANNED,
        };

        try {
          await service.validateUserStatus(user);
        } catch (e) {
          expect(e.message).to.be.equals('user invalid status');
        }
      });
    });

    describe('on `DELETED` status', () => {
      it('should throw error', async () => {
        const user: IUser = {
          id: 'someUserId',
          username: 'someUsername',
          password: 'someHashPassword',
          lastConnection: new Date().toISOString(),
          status: UserStatus.DELETED,
        };

        try {
          await service.validateUserStatus(user);
        } catch (e) {
          expect(e.message).to.be.equals('user invalid status');
        }
      });
    });
  });
});
